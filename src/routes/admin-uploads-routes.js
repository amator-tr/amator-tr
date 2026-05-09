// dosyalar.amator.tr admin upload akisi.
//
// Guvenlik katmanlari:
// 1. adminMiddleware (role=admin)
// 2. Rate-limit (5/min/admin, in-memory)
// 3. Body size: nginx 100m sinirina kadar
// 4. Magic-byte (file-type) + ext-MIME tuple kontrolu (categorize.js ALLOW)
// 5. Filename sanitize + 8-byte random prefix (path-traversal + collision)
// 6. safeWrite ile data/dosyalar/ disina yazim imkansiz
// 7. nginx tarafinda Content-Disposition: attachment (img haric) +
//    .svg/.html/.js/.php/.sh/.bat 403 (defense-in-depth)
// 8. Delete: password reauth (mevcut admin-articles pattern'ini)

import { Hono } from 'hono';
import path from 'node:path';
import crypto from 'node:crypto';
import { existsSync } from 'node:fs';
import { fileTypeFromBuffer } from 'file-type';
import { adminMiddleware, hashPassword, timingSafeEqualHex, CURRENT_ITERATIONS, LEGACY_ITERATIONS } from '../auth.js';
import { logActivity } from '../helpers.js';
import { safeWrite, safeUnlink, repoPath } from '../articles/files.js';
import {
  getExt, isAllowed, categoryFor, magicMatchesExt, sanitizeFilename, CATEGORIES
} from '../uploads/categorize.js';

const REPO_ROOT = path.resolve(process.env.REPO_ROOT || process.cwd());
const DOSYALAR_ROOT = path.join(REPO_ROOT, 'data', 'dosyalar');
const PUBLIC_BASE = process.env.DOSYALAR_BASE_URL || 'https://dosyalar.amator.tr';

const uploads = new Hono();

// --- CORS for cross-subdomain uploads --------------------------------------
// EasyMDE makale editorunde (cagri.amator.tr) gorsel yukleme yapildiginda
// dosyalar.amator.tr/api/dosyalar/upload'a cross-origin POST atar.
// Cookie .amator.tr scope'lu oldugu icin credentials:'include' yeter; sadece
// CORS header'lari gerek. Allow-Origin reflect — sadece allowlist'teki
// origin'lerden gelen istekleri yansit.
const ALLOWED_CORS_ORIGINS = new Set([
  'https://cagri.amator.tr',
  'https://amator.tr',
  'https://dosyalar.amator.tr',
]);

function applyCors(c) {
  const origin = c.req.header('Origin');
  if (origin && ALLOWED_CORS_ORIGINS.has(origin)) {
    c.header('Access-Control-Allow-Origin', origin);
    c.header('Access-Control-Allow-Credentials', 'true');
    c.header('Vary', 'Origin');
  }
}

uploads.use('/api/dosyalar/*', async (c, next) => {
  applyCors(c);
  if (c.req.method === 'OPTIONS') {
    c.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    c.header('Access-Control-Allow-Headers', 'Content-Type');
    c.header('Access-Control-Max-Age', '600');
    return c.body(null, 204);
  }
  return next();
});

// --- helpers --------------------------------------------------------------

async function reauthAdmin(c) {
  let body;
  try { body = await c.req.json(); } catch { return { ok: false, status: 400, err: 'Gecersiz istek' }; }
  const password = body.password || '';
  if (!password) return { ok: false, status: 401, err: 'Mevcut sifre gerekli' };
  const user = await c.env.DB.prepare('SELECT password_hash, password_salt, password_iterations FROM users WHERE id = ?').bind(c.get('userId')).first();
  if (!user) return { ok: false, status: 401, err: 'Kullanici bulunamadi' };
  const iters = user.password_iterations || LEGACY_ITERATIONS;
  const hash = await hashPassword(password, user.password_salt, iters);
  if (!timingSafeEqualHex(hash, user.password_hash)) return { ok: false, status: 401, err: 'Sifre yanlis' };
  return { ok: true, body };
}

// 5/min/admin in-memory rate limiter.
const rlMap = new Map(); // userId -> { window: ts, count: n }
const RL_WINDOW_MS = 60_000;
const RL_MAX = 5;
function rateLimit(userId) {
  const now = Date.now();
  const slot = rlMap.get(userId);
  if (!slot || now - slot.window > RL_WINDOW_MS) {
    rlMap.set(userId, { window: now, count: 1 });
    return true;
  }
  if (slot.count >= RL_MAX) return false;
  slot.count++;
  return true;
}

function publicUrl(category, filename) {
  return `${PUBLIC_BASE}/${category}/${filename}`;
}

// --- routes ---------------------------------------------------------------

// Liste — adminin yukledigi dosyalar (filtre+search)
uploads.get('/api/dosyalar/list', adminMiddleware(), async (c) => {
  const cat = c.req.query('category') || '';
  const q = c.req.query('q') || '';
  let sql = `SELECT id, original_name, stored_path, category, mime, size, sha256, uploaded_at,
                    (SELECT username FROM users WHERE id = uploaded_by) AS uploaded_by_name
             FROM uploads`;
  const where = [];
  const params = [];
  if (cat && CATEGORIES.includes(cat)) { where.push('category = ?'); params.push(cat); }
  if (q) { where.push('original_name LIKE ?'); params.push(`%${q}%`); }
  if (where.length) sql += ' WHERE ' + where.join(' AND ');
  sql += ' ORDER BY uploaded_at DESC LIMIT 200';
  const rows = await c.env.DB.prepare(sql).bind(...params).all();
  // Toplam disk kullanimi
  const total = await c.env.DB.prepare('SELECT COALESCE(SUM(size), 0) AS total, COUNT(*) AS n FROM uploads').first();
  // URL ekle
  const items = (rows.results || []).map(r => {
    const fname = path.basename(r.stored_path);
    return { ...r, url: publicUrl(r.category, fname) };
  });
  return c.json({ items, total_size: total?.total || 0, total_count: total?.n || 0 });
});

// Upload — multipart/form-data, single file alani: 'file'
uploads.post('/api/dosyalar/upload', adminMiddleware(), async (c) => {
  const userId = c.get('userId');
  if (!rateLimit(userId)) {
    return c.json({ error: 'Cok fazla yukleme — bir dakika bekleyin' }, 429);
  }

  let body;
  try {
    body = await c.req.parseBody({ all: false });
  } catch (err) {
    return c.json({ error: 'Form parse hatasi: ' + err.message }, 400);
  }
  const file = body.file;
  if (!file || typeof file === 'string' || !file.arrayBuffer) {
    return c.json({ error: '`file` form alani eksik' }, 400);
  }
  if (!file.name) {
    return c.json({ error: 'Dosya adi yok' }, 400);
  }

  const ext = getExt(file.name);
  if (!ext) {
    return c.json({ error: 'Uzanti yok — yasak' }, 400);
  }
  if (!isAllowed(ext)) {
    return c.json({ error: `'.${ext}' kabul edilmiyor` }, 400);
  }

  const ab = await file.arrayBuffer();
  const buf = Buffer.from(ab);
  if (buf.length === 0) return c.json({ error: 'Dosya bos' }, 400);

  // Magic-byte detect
  let detected = null;
  try {
    detected = await fileTypeFromBuffer(buf);
  } catch { detected = null; }

  if (!magicMatchesExt(ext, detected)) {
    await logActivity(c.env.DB, userId, 'upload_rejected_magic_mismatch',
      `${file.name}: ext=${ext} detected=${detected?.mime || 'null'}`);
    return c.json({
      error: 'Dosya icerigi uzantisiyla uyusmuyor',
      details: { ext, detected: detected?.mime || null }
    }, 400);
  }

  const category = categoryFor(ext);
  const sanitized = sanitizeFilename(file.name);
  const prefix = crypto.randomBytes(8).toString('hex');
  const finalName = `${prefix}-${sanitized}`;
  const storedPath = path.join(DOSYALAR_ROOT, category, finalName);

  // Yaz (safeWrite ALLOWED_ROOTS'ta data/dosyalar bekleyecek)
  try {
    await safeWrite(storedPath, buf);
  } catch (err) {
    return c.json({ error: 'Yazma hatasi: ' + err.message }, 500);
  }

  const sha256 = crypto.createHash('sha256').update(buf).digest('hex');
  const mime = detected?.mime || 'application/octet-stream';

  try {
    await c.env.DB.prepare(`
      INSERT INTO uploads (original_name, stored_path, category, mime, size, sha256, uploaded_by)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(file.name, storedPath, category, mime, buf.length, sha256, userId).run();
  } catch (err) {
    // DB hatasi: dosyayi sil ki orphan olmasin
    try { await safeUnlink(storedPath); } catch {}
    return c.json({ error: 'DB INSERT hatasi: ' + err.message }, 500);
  }

  await logActivity(c.env.DB, userId, 'upload_file', `${category}/${finalName} (${buf.length}B)`);

  return c.json({
    ok: true,
    url: publicUrl(category, finalName),
    original_name: file.name,
    size: buf.length,
    sha256,
    category,
    mime,
  });
});

// Delete — re-auth gerekli
uploads.delete('/api/dosyalar/:id', adminMiddleware(), async (c) => {
  const id = parseInt(c.req.param('id'), 10);
  if (!Number.isInteger(id) || id <= 0) return c.json({ error: 'Gecersiz id' }, 400);

  const auth = await reauthAdmin(c);
  if (!auth.ok) return c.json({ error: auth.err }, auth.status);

  const row = await c.env.DB.prepare('SELECT stored_path, original_name, category FROM uploads WHERE id = ?').bind(id).first();
  if (!row) return c.json({ error: 'Dosya bulunamadi' }, 404);

  // Path validate: stored_path data/dosyalar/ icinde mi? safeUnlink ALLOWED_ROOTS
  // disinda yazima izin vermez ama yine basenamem'de sapma kontrolu icin
  // existsSync sonrasi safeUnlink atomik silsin.
  if (existsSync(row.stored_path)) {
    try { await safeUnlink(row.stored_path); }
    catch (err) {
      return c.json({ error: 'Disk silme hatasi: ' + err.message }, 500);
    }
  }
  await c.env.DB.prepare('DELETE FROM uploads WHERE id = ?').bind(id).run();
  await logActivity(c.env.DB, c.get('userId'), 'upload_delete', `${row.category}/${path.basename(row.stored_path)}`);

  return c.json({ ok: true });
});

export default uploads;
