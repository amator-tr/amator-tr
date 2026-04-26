/**
 * role-export-routes.js — Hono port of Role-Exporter Cloudflare Worker.
 *
 * Endpoints (mounted at /api/role-export):
 *   GET  /api/role-export/roleler               → amatortelsizcilik.com.tr proxy (4hr cache)
 *   GET  /api/role-export/telsizcilik/roleler   → telsizcilik.com Supabase proxy (4hr cache)
 *   GET  /api/role-export/tarole/roleler?part=X  → ta-role.com VHF/UHF/DMR scraper (4hr cache)
 *   GET  /api/role-export/tarole/talkgruplar    → DMR talk grupları (4hr cache)
 *   GET  /api/role-export/tarole/simplex        → simplex frequencies (4hr cache)
 *   POST /api/role-export/auth/verify           → password → hourly token
 *   GET  /api/role-export/protected/airband     → airband (token gerekli)
 *   GET  /api/role-export/protected/marine      → marine (token gerekli)
 */

import { Hono } from "hono";
import { AIRBAND_FALLBACK, MARINE_FALLBACK } from "../fallback-data.js";
import {
  parseAirbandHtml,
  parseMarineHtml,
  normalizeTelsizcilikRow,
  normalizeTurkish,
} from "../scrapers.js";

// ─── In-memory cache (replaces caches.default) ─────────────────────────────

const cache = new Map();

function getCached(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache(key, data, ttlMs) {
  cache.set(key, { data, expires: Date.now() + ttlMs });
}

// ─── Constants ──────────────────────────────────────────────────────────────

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Expose-Headers": "X-Cache-Time, Age",
};

const UPSTREAM_URL = "https://amatortelsizcilik.com.tr/roleler/data.json";
const CACHE_TTL = 14400; // 4 hours in seconds
const CACHE_TTL_MS = CACHE_TTL * 1000;
const TAROLE_CACHE_TTL = 14400;
const TAROLE_CACHE_TTL_MS = TAROLE_CACHE_TTL * 1000;
const TAROLE_BASE = "https://www.ta-role.com";
const FETCH_TIMEOUT = 20000;

const TELSIZCILIK_URL =
  "https://sktymkkqjandkwjdqrfs.supabase.co/rest/v1/relays?select=*&limit=1000";
const TELSIZCILIK_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrdHlta2txamFuZGt3amRxcmZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1NDk1NTEsImV4cCI6MjA4MzEyNTU1MX0.iQOSf87fzE6preeo6aQ1adNW2kkNppH6WxvoGG2k5kg";

// ─── Token generation & verification ────────────────────────────────────────

function getTokenSecret() {
  return process.env.TOKEN_SECRET || process.env.PROTECTED_PASSWORD;
}

async function signTokenAt(password, secret, ts) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(password + ":" + ts),
  );
  return btoa(String.fromCharCode(...new Uint8Array(signature)));
}

async function generateToken(password, secret) {
  const ts = Math.floor(Date.now() / (3600 * 1000)); // hourly bucket
  return signTokenAt(password, secret, ts);
}

async function verifyToken(token, password, secret) {
  if (typeof token !== "string" || token.length < 8 || token.length > 256)
    return false;
  const tsNow = Math.floor(Date.now() / (3600 * 1000));
  const current = await signTokenAt(password, secret, tsNow);
  if (await timingSafeEqual(token, current)) return true;
  const prev = await signTokenAt(password, secret, tsNow - 1);
  return timingSafeEqual(token, prev);
}

// ─── Timing-safe comparison ─────────────────────────────────────────────────

async function timingSafeEqual(a, b) {
  const encoder = new TextEncoder();
  const aBuf = encoder.encode(a);
  const bBuf = encoder.encode(b);
  if (aBuf.length !== bBuf.length) {
    // Compare against self to keep constant time
    const key = await crypto.subtle.importKey(
      "raw",
      aBuf,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    await crypto.subtle.sign("HMAC", key, aBuf);
    return false;
  }
  const key = await crypto.subtle.importKey(
    "raw",
    aBuf,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sigA = new Uint8Array(await crypto.subtle.sign("HMAC", key, aBuf));
  const sigB = new Uint8Array(await crypto.subtle.sign("HMAC", key, bBuf));
  let result = 0;
  for (let i = 0; i < sigA.length; i++) result |= sigA[i] ^ sigB[i];
  return result === 0;
}

// ─── Rate limiting (simple in-memory counter) ───────────────────────────────

const rateLimitMap = new Map();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 60_000;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.expires) {
    rateLimitMap.set(ip, { count: 1, expires: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_ATTEMPTS) return false;
  entry.count++;
  return true;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function setCorsHeaders(c) {
  for (const [k, v] of Object.entries(CORS)) {
    c.header(k, v);
  }
}

async function fetchPage(url, retries = 0) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const resp = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; RoleExporter/2.0)",
          Accept: "text/html,application/xhtml+xml",
          "Accept-Language": "tr-TR,tr;q=0.9",
        },
        signal: AbortSignal.timeout(FETCH_TIMEOUT),
      });
      if (!resp.ok) return null;
      return await resp.text();
    } catch {
      if (attempt < retries) continue;
      return null;
    }
  }
  return null;
}

// ─── Discovery & scraping helpers ───────────────────────────────────────────

const SPECIAL_SLUGS = new Set([
  "index.html",
  "talk-gruplar.html",
  "simplex.html",
  "geni--hs.html",
  "dmr-id-list.html",
  "ileti-im.html",
]);

function getLinksFromSection(sectionHtml) {
  if (!sectionHtml) return [];
  const linkRegex =
    /href="(?:https?:\/\/(?:www\.)?ta-role\.com\/)?([^"]+\.html)"/gi;
  const links = [];
  let m;
  while ((m = linkRegex.exec(sectionHtml)) !== null) {
    links.push(m[1]);
  }
  return links;
}

function getLinksWithBolge(sectionHtml) {
  if (!sectionHtml) return [];

  const bolgeMarkers = [];
  const bolgeRe = />(\d)\.B[öo]lge</gi;
  let bm;
  while ((bm = bolgeRe.exec(sectionHtml)) !== null) {
    bolgeMarkers.push({ pos: bm.index, bolge: bm[1] });
  }

  const linkRegex =
    /href="(?:https?:\/\/(?:www\.)?ta-role\.com\/)?([^"]+\.html)"/gi;
  const results = [];
  let lm;
  while ((lm = linkRegex.exec(sectionHtml)) !== null) {
    let bolge = "0";
    for (const marker of bolgeMarkers) {
      if (marker.pos < lm.index) bolge = marker.bolge;
    }
    results.push({ slug: lm[1], tabolge: "TA" + bolge });
  }
  return results;
}

function findSectionIndex(html, text) {
  const idx = html.indexOf(">" + text + "<");
  if (idx !== -1) return idx;
  const re = new RegExp(
    ">\\s*" + text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\s*<",
    "i",
  );
  const match = html.match(re);
  return match ? match.index : -1;
}

function discoverPages(html) {
  const result = { vhfPages: [], uhfPages: [], dmrPages: [], otherPages: {} };

  const vhfIdx = findSectionIndex(html, "VHF Analog");
  const uhfIdx = findSectionIndex(html, "UHF Analog");
  const digitalIdx = findSectionIndex(html, "Digital Röleler");
  const digitalFallback =
    digitalIdx !== -1 ? digitalIdx : findSectionIndex(html, "Digital");

  if (vhfIdx !== -1 && uhfIdx !== -1) {
    const section = html.slice(vhfIdx, uhfIdx);
    const seen = new Set();
    for (const { slug, tabolge } of getLinksWithBolge(section)) {
      if (SPECIAL_SLUGS.has(slug) || seen.has(slug)) continue;
      seen.add(slug);
      result.vhfPages.push({
        url: TAROLE_BASE + "/" + slug,
        slug,
        label: slugToLabel(slug),
        tabolge,
      });
    }
  }

  if (uhfIdx !== -1) {
    const end = digitalFallback !== -1 ? digitalFallback : html.length;
    const section = html.slice(uhfIdx, end);
    const seen = new Set();
    for (const { slug, tabolge } of getLinksWithBolge(section)) {
      if (SPECIAL_SLUGS.has(slug) || seen.has(slug)) continue;
      seen.add(slug);
      result.uhfPages.push({
        url: TAROLE_BASE + "/" + slug,
        slug,
        label: slugToLabel(slug),
        tabolge,
      });
    }
  }

  if (digitalFallback !== -1) {
    const afterDigital = html.slice(digitalFallback);
    const nextTopLi = afterDigital.indexOf("ileti-im.html");
    const section =
      nextTopLi !== -1
        ? afterDigital.slice(0, nextTopLi)
        : afterDigital.slice(0, 3000);
    const seen = new Set();
    for (const slug of getLinksFromSection(section)) {
      if (seen.has(slug)) continue;
      seen.add(slug);
      if (slug === "talk-gruplar.html") {
        result.otherPages.talkGruplar = TAROLE_BASE + "/" + slug;
      } else if (slug === "simplex.html") {
        result.otherPages.simplex = TAROLE_BASE + "/" + slug;
      } else if (slug === "geni--hs.html" || slug === "dmr-id-list.html") {
        result.otherPages[slug.replace(".html", "")] =
          TAROLE_BASE + "/" + slug;
      } else if (!SPECIAL_SLUGS.has(slug)) {
        const bolge = slug.match(/(\d)\.boelge/)?.[1] || "0";
        result.dmrPages.push({
          url: TAROLE_BASE + "/" + slug,
          slug,
          label: slugToLabel(slug),
          tabolge: "TA" + bolge,
        });
      }
    }
  }

  return result;
}

function slugToLabel(slug) {
  let name = slug.replace(".html", "");
  name = name.replace(/-\d+(-\d+)?$/, "");
  if (name.startsWith("-")) name = name.slice(1);
  if (/^\d\.boelge/.test(name)) {
    return name.replace(".", ". ").replace("boelge", "Bolge");
  }
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function slugToSehir(slug) {
  let name = slug.replace(".html", "");
  name = name.replace(/-\d+(-\d+)?$/, "");
  if (name.startsWith("-")) name = name.slice(1);
  if (/^\d\./.test(name)) return null;

  const map = {
    "k.maras": "kahramanmaras",
    sparta: "isparta",
  };
  return map[name] || name;
}

// ─── Table parsers ──────────────────────────────────────────────────────────

function normalizeFrekans(str) {
  if (!str || str === "-") return null;
  let clean = str.replace(/[^\d.]/g, "");
  const dots = (clean.match(/\./g) || []).length;
  if (dots > 1) {
    const parts = clean.split(".");
    clean = parts[0] + "." + parts.slice(1).join("");
  }
  const num = parseFloat(clean);
  if (isNaN(num) || num < 50 || num > 1000) return null;
  return num.toFixed(5);
}

function extractTableRows(html) {
  const rows = [];
  const rowRegex = /<tr[^>]*>\s*((?:<td[^>]*>[\s\S]*?<\/td>\s*)+)<\/tr>/gi;
  let rm;
  while ((rm = rowRegex.exec(html)) !== null) {
    const cellRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
    const cells = [];
    let cm;
    while ((cm = cellRegex.exec(rm[1])) !== null) {
      cells.push(cm[1].replace(/<[^>]*>/g, "").trim());
    }
    if (cells.length >= 3) rows.push(cells);
  }
  return rows;
}

function detectTableType(rows) {
  for (const cells of rows) {
    const joined = cells.join(" ").toLowerCase();
    if (joined.includes("mevk")) {
      if (joined.includes("tone") || joined.includes("ton")) return "analog";
      if (joined.includes("time") || joined.includes("slot")) return "dmr";
      return cells.length >= 5 ? "analog" : "dmr";
    }
  }
  return null;
}

function parseAnalogRows(rows, sehir, bant, tabolge) {
  const roleler = [];

  for (const cells of rows) {
    if (cells[0].toLowerCase().includes("mevk")) continue;
    if (cells.length < 3) continue;

    const mevki = cells[0];
    const roleTx = cells[1]; // repeater TX = our RX
    const roleRx = cells[2]; // repeater RX = our TX
    const rxTone = cells.length > 4 ? cells[4] : "";

    const rxFrek = normalizeFrekans(roleTx);
    const txFrek = normalizeFrekans(roleRx);
    if (!rxFrek) continue;

    const tone = rxTone && rxTone !== "-" ? rxTone : null;

    roleler.push({
      kaynak: "tarole",
      sehir: sehir || "",
      bant: bant,
      konum: mevki,
      frekans: rxFrek,
      txFrekans: txFrek || rxFrek,
      ton: tone,
      digital: 0,
      durum: true,
      tabolge: tabolge || "",
    });
  }
  return roleler;
}

function parseDmrRows(rows, tabolge) {
  const roleler = [];

  for (const cells of rows) {
    if (cells[0].toLowerCase().includes("mevk")) continue;
    if (cells.length < 3) continue;

    const mevki = cells[0];
    const roleTx = cells[1];
    const roleRx = cells[2];
    const timeSlot = cells.length > 3 ? cells[3] : "";

    const rxFrek = normalizeFrekans(roleTx);
    const txFrek = normalizeFrekans(roleRx);
    if (!rxFrek) continue;

    const rx = parseFloat(rxFrek);
    const bant = rx < 200 ? "VHF" : "UHF";
    const isC4FM = timeSlot.toUpperCase().includes("C4FM");

    let ts = "";
    if (timeSlot.includes("TS-1") && timeSlot.includes("TS-2"))
      ts = "TS1+TS2";
    else if (timeSlot.includes("TS-2") || timeSlot.includes("TS2")) ts = "TS2";
    else if (timeSlot.includes("TS-1") || timeSlot.includes("TS1")) ts = "TS1";

    const sehir = normalizeTurkish(mevki.split(" ")[0] || "");

    roleler.push({
      kaynak: "tarole",
      sehir,
      bant,
      konum: mevki,
      frekans: rxFrek,
      txFrekans: txFrek || rxFrek,
      ton: null,
      digital: isC4FM ? 0 : 1,
      durum: true,
      timeSlot: ts,
      dijitalMod: isC4FM ? "C4FM" : "DMR",
      tabolge: tabolge || "",
    });
  }
  return roleler;
}

function parsePageTable(html, slug, forcedBant, tabolge) {
  const rows = extractTableRows(html);
  if (rows.length === 0) return [];

  const tableType = detectTableType(rows);
  const sehir = slugToSehir(slug);

  if (tableType === "analog" || forcedBant) {
    const bant = forcedBant || (slug.includes("-1") ? "UHF" : "VHF");
    return parseAnalogRows(rows, sehir, bant, tabolge);
  }

  if (tableType === "dmr") {
    return parseDmrRows(rows, tabolge);
  }

  // Fallback: try analog
  return parseAnalogRows(rows, sehir, forcedBant || "VHF", tabolge);
}

// ─── Talk Groups & Simplex parsers ──────────────────────────────────────────

function parseTalkGruplar(html) {
  const gruplar = [];
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>/g, "\n");

  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const seen = new Set();

  for (const line of lines) {
    const match = line.match(/^(\d+)\s*:?\s*(.+)$/);
    if (!match) continue;
    const tgId = parseInt(match[1], 10);
    const ad = match[2].trim();
    if (tgId < 6 || ad.length < 2 || seen.has(tgId)) continue;
    seen.add(tgId);

    let tip = "diger";
    if (tgId === 286) tip = "ulusal";
    else if (tgId === 28600) tip = "multimode";
    else if (tgId >= 2860 && tgId <= 2869) tip = "bolge";
    else if (tgId >= 28601 && tgId <= 28699) tip = "il";
    else if (tgId === 286112 || tgId === 286911) tip = "acil";
    else if (String(tgId).length > 5) tip = "uluslararasi";

    gruplar.push({ tgId, ad, tip });
  }
  return gruplar;
}

/**
 * Parse simplex.html — extract the body content from the fetched HTML.
 * Returns structured data with simplex frequency entries.
 */
function parseSimplex(html) {
  const frekanslar = [];
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>/g, "\n");

  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  for (const line of lines) {
    // Try to extract frequency-like patterns (e.g. "145.500 MHz ...")
    const match = line.match(
      /(\d{2,3}[.,]\d{3,6})\s*(?:MHz)?\s*[-–:]\s*(.+)/i,
    );
    if (match) {
      const frek = match[1].replace(",", ".");
      const aciklama = match[2].trim();
      if (aciklama.length >= 2) {
        frekanslar.push({ frekans: frek, aciklama });
      }
    }
  }

  return frekanslar;
}

// ─── Batch fetch ────────────────────────────────────────────────────────────

async function batchFetch(items, batchSize) {
  const results = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(async (item) => {
        const html = await fetchPage(item.url);
        return { ...item, html };
      }),
    );
    results.push(...batchResults);
  }
  return results;
}

// ─── Deduplication ──────────────────────────────────────────────────────────

function deduplicateRoleler(roleler) {
  const seen = new Map();
  for (const role of roleler) {
    const key = `${role.frekans}_${(role.konum || "").toLowerCase().slice(0, 8)}`;
    if (!seen.has(key)) seen.set(key, role);
  }
  return [...seen.values()];
}

// ─── Cached handler wrapper (in-memory) ─────────────────────────────────────

function isEmptyResult(data) {
  if (Array.isArray(data)) return data.length === 0;
  if (data && typeof data === "object") {
    return Object.values(data).every(
      (v) => Array.isArray(v) && v.length === 0,
    );
  }
  return !data;
}

async function cachedHandler(c, cacheId, ttlMs, producer) {
  const cached = getCached(cacheId);
  if (cached) {
    setCorsHeaders(c);
    c.header("X-Cache-Time", cached.cacheTime);
    c.header("Age", String(Math.floor((Date.now() - cached.storedAt) / 1000)));
    return c.json(cached.body);
  }

  const data = await producer();

  // Never cache empty results — likely a transient fetch failure
  if (isEmptyResult(data)) {
    setCorsHeaders(c);
    return c.json(data);
  }

  const now = new Date().toISOString();
  setCache(cacheId, { body: data, cacheTime: now, storedAt: Date.now() }, ttlMs);

  setCorsHeaders(c);
  c.header("Cache-Control", "public, max-age=" + Math.floor(ttlMs / 1000));
  c.header("X-Cache-Time", now);
  return c.json(data);
}

// ─── Hono app & routes ─────────────────────────────────────────────────────

const roleExport = new Hono();

// CORS preflight for all routes
roleExport.options("/api/role-export/*", (c) => {
  setCorsHeaders(c);
  return c.body(null, 204);
});

// ─── GET /api/role-export/roleler ───────────────────────────────────────────

roleExport.get("/api/role-export/roleler", async (c) => {
  const cacheId = "roleler-upstream";
  const cached = getCached(cacheId);
  if (cached) {
    setCorsHeaders(c);
    c.header("Content-Type", "application/json");
    c.header("X-Cache-Time", cached.cacheTime);
    c.header("Age", String(Math.floor((Date.now() - cached.storedAt) / 1000)));
    return c.body(cached.raw);
  }

  let upstreamResponse;
  try {
    upstreamResponse = await fetch(UPSTREAM_URL, {
      headers: { "User-Agent": "RoleExporter-Worker/2.0" },
      signal: AbortSignal.timeout(8000),
    });
  } catch (err) {
    setCorsHeaders(c);
    if (err instanceof DOMException && err.name === "TimeoutError") {
      return c.json({ hata: "Kaynak sunucu zaman asimina ugradi" }, 504);
    }
    return c.json({ hata: "Kaynak sunucuya erisilemiyor" }, 502);
  }

  if (!upstreamResponse.ok) {
    setCorsHeaders(c);
    return c.json({ hata: "Kaynak sunucuya erisilemiyor" }, 502);
  }

  let bodyText;
  try {
    bodyText = await upstreamResponse.text();
    JSON.parse(bodyText); // validate
  } catch {
    setCorsHeaders(c);
    return c.json({ hata: "Gecersiz veri formati" }, 502);
  }

  const now = new Date().toISOString();
  setCache(
    cacheId,
    { raw: bodyText, cacheTime: now, storedAt: Date.now() },
    CACHE_TTL_MS,
  );

  setCorsHeaders(c);
  c.header("Content-Type", "application/json");
  c.header("Cache-Control", `public, max-age=${CACHE_TTL}`);
  c.header("X-Cache-Time", now);
  return c.body(bodyText);
});

// ─── GET /api/role-export/telsizcilik/roleler ───────────────────────────────

roleExport.get("/api/role-export/telsizcilik/roleler", async (c) => {
  return cachedHandler(c, "telsizcilik-relays", CACHE_TTL_MS, async () => {
    let resp;
    try {
      resp = await fetch(TELSIZCILIK_URL, {
        headers: {
          apikey: TELSIZCILIK_ANON_KEY,
          Authorization: `Bearer ${TELSIZCILIK_ANON_KEY}`,
        },
        signal: AbortSignal.timeout(15000),
      });
    } catch {
      return [];
    }
    if (!resp.ok) return [];
    let rows;
    try {
      rows = await resp.json();
    } catch {
      return [];
    }
    if (!Array.isArray(rows)) return [];
    const out = [];
    for (const r of rows) {
      const rec = normalizeTelsizcilikRow(r);
      if (rec) out.push(rec);
    }
    return out;
  });
});

// ─── GET /api/role-export/tarole/roleler?part=X ─────────────────────────────

const VALID_PARTS = new Set(["vhf1", "vhf2", "uhf1", "uhf2", "dmr"]);

roleExport.get("/api/role-export/tarole/roleler", async (c) => {
  const part = c.req.query("part");

  if (!part || !VALID_PARTS.has(part)) {
    setCorsHeaders(c);
    return c.json(
      {
        hata: "part parametresi gerekli: vhf1, vhf2, uhf1, uhf2, dmr",
        parts: [...VALID_PARTS],
      },
      400,
    );
  }

  return cachedHandler(
    c,
    "tarole-roleler-" + part,
    TAROLE_CACHE_TTL_MS,
    async () => {
      const indexHtml = await fetchPage(TAROLE_BASE + "/index.html", 1);
      if (!indexHtml) return [];

      const pages = discoverPages(indexHtml);
      const allRoleler = [];

      let pageList;
      let forcedBant;
      if (part === "dmr") {
        pageList = pages.dmrPages;
        forcedBant = null;
      } else {
        const isVhf = part.startsWith("vhf");
        const source = isVhf ? pages.vhfPages : pages.uhfPages;
        const half = Math.ceil(source.length / 2);
        pageList = part.endsWith("1")
          ? source.slice(0, half)
          : source.slice(half);
        forcedBant = isVhf ? "VHF" : "UHF";
      }

      const results = await batchFetch(pageList, 6);
      for (const { slug, html, tabolge } of results) {
        if (!html) continue;
        allRoleler.push(...parsePageTable(html, slug, forcedBant, tabolge));
      }

      return deduplicateRoleler(allRoleler);
    },
  );
});

// ─── GET /api/role-export/tarole/talkgruplar ────────────────────────────────

roleExport.get("/api/role-export/tarole/talkgruplar", async (c) => {
  return cachedHandler(
    c,
    "tarole-talkgruplar",
    TAROLE_CACHE_TTL_MS,
    async () => {
      const html = await fetchPage(TAROLE_BASE + "/talk-gruplar.html", 1);
      if (!html) return [];
      return parseTalkGruplar(html);
    },
  );
});

// ─── GET /api/role-export/tarole/simplex ────────────────────────────────────

roleExport.get("/api/role-export/tarole/simplex", async (c) => {
  return cachedHandler(
    c,
    "tarole-simplex",
    TAROLE_CACHE_TTL_MS,
    async () => {
      const html = await fetchPage(TAROLE_BASE + "/simplex.html", 1);
      if (!html) return [];
      return parseSimplex(html);
    },
  );
});

// ─── POST /api/role-export/auth/verify ──────────────────────────────────────

roleExport.post("/api/role-export/auth/verify", async (c) => {
  setCorsHeaders(c);

  const ip =
    c.req.header("X-Forwarded-For")?.split(",")[0]?.trim() ||
    c.req.header("X-Real-IP") ||
    "unknown";

  if (!checkRateLimit(ip)) {
    return c.json({ hata: "Cok fazla deneme. 1 dakika bekleyin." }, 429);
  }

  let body;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ hata: "Gecersiz istek" }, 400);
  }

  const password = body?.password;
  const secret = process.env.PROTECTED_PASSWORD;
  if (!password || !secret || !(await timingSafeEqual(password, secret))) {
    return c.json({ hata: "Yanlis sifre" }, 401);
  }

  const token = await generateToken(password, getTokenSecret());
  return c.json({ token });
});

// ─── GET /api/role-export/protected/airband ─────────────────────────────────

roleExport.get("/api/role-export/protected/airband", async (c) => {
  setCorsHeaders(c);

  const auth = c.req.header("Authorization") || "";
  const token = auth.replace(/^Bearer\s+/i, "");
  const secret = process.env.PROTECTED_PASSWORD;
  if (
    !token ||
    !(await verifyToken(token, secret, getTokenSecret()))
  ) {
    return c.json({ hata: "Yetkisiz" }, 401);
  }

  return cachedHandler(
    c,
    "protected-airband",
    CACHE_TTL_MS,
    async () => {
      try {
        const resp = await fetch("https://skyvector.com/airports/Turkey", {
          signal: AbortSignal.timeout(10000),
          headers: { "User-Agent": "Mozilla/5.0 TurkRoleExporter" },
        });
        if (!resp.ok) {
          await resp.body?.cancel();
          throw new Error("HTTP " + resp.status);
        }
        const parsed = parseAirbandHtml(await resp.text(), AIRBAND_FALLBACK);
        return {
          ...parsed,
          kaynak: "live",
          guncellenme: new Date().toISOString(),
        };
      } catch (err) {
        console.warn("[airband] live fetch failed, fallback:", err.message);
        return AIRBAND_FALLBACK;
      }
    },
  );
});

// ─── GET /api/role-export/protected/marine ──────────────────────────────────

roleExport.get("/api/role-export/protected/marine", async (c) => {
  setCorsHeaders(c);

  const auth = c.req.header("Authorization") || "";
  const token = auth.replace(/^Bearer\s+/i, "");
  const secret = process.env.PROTECTED_PASSWORD;
  if (
    !token ||
    !(await verifyToken(token, secret, getTokenSecret()))
  ) {
    return c.json({ hata: "Yetkisiz" }, 401);
  }

  return cachedHandler(
    c,
    "protected-marine",
    CACHE_TTL_MS,
    async () => {
      try {
        const resp = await fetch(
          "https://www.qsl.net/ta1dx/amator/bandmarine.htm",
          {
            signal: AbortSignal.timeout(10000),
            headers: { "User-Agent": "Mozilla/5.0 TurkRoleExporter" },
          },
        );
        if (!resp.ok) {
          await resp.body?.cancel();
          throw new Error("HTTP " + resp.status);
        }
        const parsed = parseMarineHtml(await resp.text(), MARINE_FALLBACK);
        return {
          ...parsed,
          kaynak: "live",
          guncellenme: new Date().toISOString(),
        };
      } catch (err) {
        console.warn("[marine] live fetch failed, fallback:", err.message);
        return MARINE_FALLBACK;
      }
    },
  );
});

// ─── Catch-all 404 ──────────────────────────────────────────────────────────

roleExport.all("/api/role-export/*", (c) => {
  setCorsHeaders(c);
  return c.json({ hata: "Bulunamadi" }, 404);
});

export default roleExport;
