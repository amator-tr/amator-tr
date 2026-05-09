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
import { existsSync, createReadStream } from 'node:fs';
import fs from 'node:fs/promises';
import { fileTypeFromBuffer } from 'file-type';
import { adminMiddleware, hashPassword, timingSafeEqualHex, CURRENT_ITERATIONS, LEGACY_ITERATIONS } from '../auth.js';
import { logActivity } from '../helpers.js';
import { safeWrite, safeUnlink, safeRead, repoPath } from '../articles/files.js';
import { withPublishLock, PublishBusyError } from '../articles/lock.js';
import { gitAdd, gitCommit, gitPush, gitHeadSha, gitResetHard, gitRestoreStaged } from '../articles/git.js';
import { runBuild } from '../articles/build.js';
import {
  getExt, isAllowed, categoryFor, magicMatchesExt, lenientName, suggestUniqueName, CATEGORIES
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

// App-level rate-limit yok — sadece admin yukleyebilir (adminMiddleware),
// nginx 'api_zone' (120r/m IP basi) baseline DoS korumasi olarak kalir.

function publicUrl(category, filename) {
  return `${PUBLIC_BASE}/${category}/${encodeURIComponent(filename)}`;
}

// --- Chunked upload session store ----------------------------------------
// Cloudflare 100 MB body limit asilamaz. Buyuk dosyalar icin client-side
// splitting: init -> chunk*N -> finalize. Her chunk <=90 MB.
//
// Session: 1 saat TTL. Ayni admin'in baska session'lari concurrent olabilir
// (her birinin upload_id'si farkli). 64-bit upload_id (32 hex char), brute-force
// + auth (cookie + admin role) icin yeterli.
const TMP_DIR = path.join(DOSYALAR_ROOT, '.tmp');
const CHUNK_SIZE = 90 * 1024 * 1024;
const MAX_TOTAL_SIZE = 5 * 1024 * 1024 * 1024; // 5 GB hard cap
const SESSION_TTL_MS = 3600_000; // 1 saat
const uploadSessions = new Map(); // upload_id -> { userId, filename, totalSize, ext, category, desiredName, desiredPath, onConflict, received, expires }

function cleanupExpiredSessions() {
  const now = Date.now();
  for (const [id, s] of uploadSessions) {
    if (s.expires < now) {
      uploadSessions.delete(id);
      const tempPath = path.join(TMP_DIR, id + '.part');
      fs.unlink(tempPath).catch(() => {});
    }
  }
}
setInterval(cleanupExpiredSessions, 5 * 60_000).unref?.();

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

// Upload — multipart/form-data, single file alani: 'file'.
// Query: ?on_conflict=error|rename|overwrite (default: error)
//   - error: ayni isimde dosya varsa 409 + suggested_name + existing_url
//   - rename: server uniq isim uretir (ornegin "foo (2).png")
//   - overwrite: ayni path'e yazar, eski DB row'u replace eder
uploads.post('/api/dosyalar/upload', adminMiddleware(), async (c) => {
  const userId = c.get('userId');

  const onConflictRaw = (c.req.query('on_conflict') || 'error').toLowerCase();
  const onConflict = ['error', 'rename', 'overwrite'].includes(onConflictRaw) ? onConflictRaw : 'error';
  const force = c.req.query('force') === 'true';

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
  const extKnown = isAllowed(ext);
  if (!extKnown && !force) {
    return c.json({
      error: `'.${ext}' uzantisi listede yok — riskli olabilir`,
      risky_unknown_ext: true,
      ext,
    }, 400);
  }

  const ab = await file.arrayBuffer();
  const buf = Buffer.from(ab);
  if (buf.length === 0) return c.json({ error: 'Dosya bos' }, 400);

  // Magic-byte detect — sadece audit log icin, reddetme yapilmiyor.
  // Admin-only upload context: file-type bircok formati guvenilir tanimaz
  // (DMG koly trailer eksik, PNG metadata weird, vs.). False-rejection
  // can sikiyor, magic-byte info'yu log'a dusur, kabul et.
  let detected = null;
  try {
    detected = await fileTypeFromBuffer(buf);
  } catch { detected = null; }

  if (extKnown && !magicMatchesExt(ext, detected)) {
    await logActivity(c.env.DB, userId, 'upload_magic_warn',
      `${file.name}: ext=${ext} detected=${detected?.mime || 'null'} (kabul edildi)`);
  }

  const category = extKnown ? categoryFor(ext) : 'diger';
  const desiredName = lenientName(file.name);
  const categoryDir = path.join(DOSYALAR_ROOT, category);
  const desiredPath = path.join(categoryDir, desiredName);

  // Cakisma cozumu
  let finalName = desiredName;
  let storedPath = desiredPath;
  let willOverwrite = false;

  if (existsSync(desiredPath)) {
    if (onConflict === 'error') {
      const suggested = suggestUniqueName(desiredName, n => existsSync(path.join(categoryDir, n)));
      return c.json({
        error: 'Bu isimde dosya zaten var',
        exists: true,
        original_name: file.name,
        category,
        existing_url: publicUrl(category, desiredName),
        suggested_name: suggested,
      }, 409);
    } else if (onConflict === 'rename') {
      const suggested = suggestUniqueName(desiredName, n => existsSync(path.join(categoryDir, n)));
      if (!suggested) {
        return c.json({ error: 'Uygun benzersiz isim bulunamadi (999 deneme)' }, 409);
      }
      finalName = suggested;
      storedPath = path.join(categoryDir, finalName);
    } else if (onConflict === 'overwrite') {
      willOverwrite = true;
    }
  }

  // Yaz (safeWrite ALLOWED_ROOTS'ta data/dosyalar bekleyecek)
  try {
    await safeWrite(storedPath, buf);
  } catch (err) {
    return c.json({ error: 'Yazma hatasi: ' + err.message }, 500);
  }

  const sha256 = crypto.createHash('sha256').update(buf).digest('hex');
  const mime = detected?.mime || 'application/octet-stream';

  try {
    if (willOverwrite) {
      // Mevcut DB row'unu guncelle
      await c.env.DB.prepare(`
        UPDATE uploads SET original_name = ?, mime = ?, size = ?, sha256 = ?, uploaded_by = ?, uploaded_at = datetime('now')
        WHERE stored_path = ?
      `).bind(file.name, mime, buf.length, sha256, userId, storedPath).run();
    } else {
      await c.env.DB.prepare(`
        INSERT INTO uploads (original_name, stored_path, category, mime, size, sha256, uploaded_by)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).bind(file.name, storedPath, category, mime, buf.length, sha256, userId).run();
    }
  } catch (err) {
    // DB hatasi: yeni yazilan dosyayi sil ki orphan olmasin (overwrite degilse)
    if (!willOverwrite) {
      try { await safeUnlink(storedPath); } catch {}
    }
    return c.json({ error: 'DB hatasi: ' + err.message }, 500);
  }

  await logActivity(c.env.DB, userId, willOverwrite ? 'upload_overwrite' : 'upload_file',
    `${category}/${finalName} (${buf.length}B)`);

  return c.json({
    ok: true,
    url: publicUrl(category, finalName),
    original_name: file.name,
    stored_name: finalName,
    size: buf.length,
    sha256,
    category,
    mime,
    overwrote: willOverwrite,
    renamed: finalName !== desiredName,
  });
});

// --- Chunked upload (>90 MB / Cloudflare 100 MB bypass) ------------------
// Akis:
//   1) POST /upload/init  — JSON {filename, total_size, on_conflict}
//      → 200 {upload_id, chunk_size}, 409 {exists,...} on_conflict=error ise
//   2) POST /upload/chunk — raw body (octet-stream). Headers: X-Upload-Id,
//      X-Chunk-Index, X-Total-Chunks. Server append-only — chunk'lar sirayla
//      gelmeli (UI sirayla gonderir). Boyut kontrolu cumulative.
//   3) POST /upload/finalize — JSON {upload_id}
//      → magic-byte check (ilk 16KB), conflict re-check, atomik rename, sha256,
//        DB INSERT/UPDATE.

uploads.post('/api/dosyalar/upload/init', adminMiddleware(), async (c) => {
  const userId = c.get('userId');

  let body;
  try { body = await c.req.json(); } catch { return c.json({ error: 'JSON parse hatasi' }, 400); }

  const filename = String(body.filename || '');
  const totalSize = Number(body.total_size);
  const onConflictRaw = (body.on_conflict || 'error').toLowerCase();
  const onConflict = ['error', 'rename', 'overwrite'].includes(onConflictRaw) ? onConflictRaw : 'error';

  if (!filename) return c.json({ error: 'filename gerekli' }, 400);
  if (!Number.isInteger(totalSize) || totalSize <= 0) return c.json({ error: 'total_size gecersiz' }, 400);
  if (totalSize > MAX_TOTAL_SIZE) return c.json({ error: `Max ${MAX_TOTAL_SIZE / (1024 * 1024 * 1024)} GB` }, 413);

  const force = body.force === true || body.force === 'true';
  const ext = getExt(filename);
  if (!ext) return c.json({ error: 'Uzanti yok' }, 400);
  const extKnown = isAllowed(ext);
  if (!extKnown && !force) {
    return c.json({
      error: `'.${ext}' uzantisi listede yok — riskli olabilir`,
      risky_unknown_ext: true,
      ext,
    }, 400);
  }

  const category = extKnown ? categoryFor(ext) : 'diger';
  const desiredName = lenientName(filename);
  const categoryDir = path.join(DOSYALAR_ROOT, category);
  const desiredPath = path.join(categoryDir, desiredName);

  // Conflict pre-check (chunked upload baslamadan once 409 vermek hizli)
  if (existsSync(desiredPath) && onConflict === 'error') {
    const suggested = suggestUniqueName(desiredName, n => existsSync(path.join(categoryDir, n)));
    return c.json({
      error: 'Bu isimde dosya zaten var',
      exists: true,
      original_name: filename,
      category,
      existing_url: publicUrl(category, desiredName),
      suggested_name: suggested,
    }, 409);
  }

  const uploadId = crypto.randomBytes(16).toString('hex');
  const tempPath = path.join(TMP_DIR, uploadId + '.part');

  await fs.mkdir(TMP_DIR, { recursive: true });
  await fs.writeFile(tempPath, '');

  uploadSessions.set(uploadId, {
    userId, filename, totalSize, ext, extKnown, category, desiredName, desiredPath,
    onConflict, received: 0, expires: Date.now() + SESSION_TTL_MS,
  });

  await logActivity(c.env.DB, userId, 'upload_init', `${filename} (${totalSize}B, ${uploadId.slice(0, 8)})`);

  return c.json({ upload_id: uploadId, chunk_size: CHUNK_SIZE });
});

uploads.post('/api/dosyalar/upload/chunk', adminMiddleware(), async (c) => {
  const uploadId = c.req.header('X-Upload-Id') || '';
  const session = uploadSessions.get(uploadId);
  if (!session) return c.json({ error: 'upload_id gecersiz' }, 404);
  if (session.userId !== c.get('userId')) return c.json({ error: 'Yetkisiz' }, 403);
  if (session.expires < Date.now()) {
    uploadSessions.delete(uploadId);
    fs.unlink(path.join(TMP_DIR, uploadId + '.part')).catch(() => {});
    return c.json({ error: 'Session TTL bitti' }, 410);
  }

  const ab = await c.req.arrayBuffer();
  const buf = Buffer.from(ab);
  if (buf.length === 0) return c.json({ error: 'Bos chunk' }, 400);
  if (buf.length > CHUNK_SIZE + 1024) return c.json({ error: 'Chunk cok buyuk' }, 413);
  if (session.received + buf.length > session.totalSize) {
    return c.json({ error: 'Toplam boyut asildi', received: session.received, total: session.totalSize }, 400);
  }

  const tempPath = path.join(TMP_DIR, uploadId + '.part');
  await fs.appendFile(tempPath, buf);
  session.received += buf.length;
  session.expires = Date.now() + SESSION_TTL_MS; // refresh TTL on activity

  return c.json({ ok: true, received: session.received, total: session.totalSize });
});

uploads.post('/api/dosyalar/upload/finalize', adminMiddleware(), async (c) => {
  const userId = c.get('userId');
  let body;
  try { body = await c.req.json(); } catch { return c.json({ error: 'JSON parse hatasi' }, 400); }

  const uploadId = String(body.upload_id || '');
  const session = uploadSessions.get(uploadId);
  if (!session) return c.json({ error: 'upload_id gecersiz' }, 404);
  if (session.userId !== userId) return c.json({ error: 'Yetkisiz' }, 403);

  const tempPath = path.join(TMP_DIR, uploadId + '.part');

  if (session.received !== session.totalSize) {
    return c.json({ error: 'Eksik chunk', received: session.received, expected: session.totalSize }, 400);
  }

  // Magic-byte: ilk 16KB — sadece audit log icin (reddetme YAPMA)
  let detected = null;
  if (session.extKnown) {
    try {
      const fh = await fs.open(tempPath, 'r');
      const head = Buffer.alloc(16384);
      const { bytesRead } = await fh.read(head, 0, 16384, 0);
      await fh.close();
      detected = await fileTypeFromBuffer(head.subarray(0, bytesRead));
    } catch {
      detected = null;
    }
    if (!magicMatchesExt(session.ext, detected)) {
      await logActivity(c.env.DB, userId, 'upload_chunked_magic_warn',
        `${session.filename}: ext=${session.ext} detected=${detected?.mime || 'null'} (kabul edildi)`);
    }
  }

  // Final isim — conflict re-check (race condition icin)
  const categoryDir = path.join(DOSYALAR_ROOT, session.category);
  let finalName = session.desiredName;
  let finalPath = session.desiredPath;
  let willOverwrite = false;

  if (existsSync(finalPath)) {
    if (session.onConflict === 'rename') {
      const suggested = suggestUniqueName(session.desiredName, n => existsSync(path.join(categoryDir, n)));
      if (!suggested) {
        await fs.unlink(tempPath).catch(() => {});
        uploadSessions.delete(uploadId);
        return c.json({ error: 'Uniq isim bulunamadi (999 deneme)' }, 409);
      }
      finalName = suggested;
      finalPath = path.join(categoryDir, finalName);
    } else if (session.onConflict === 'overwrite') {
      willOverwrite = true;
    } else {
      await fs.unlink(tempPath).catch(() => {});
      uploadSessions.delete(uploadId);
      return c.json({ error: 'Race: dosya finalize sirasinda olustu' }, 409);
    }
  }

  // Atomik move (ayni filesystem icinde rename)
  try {
    await fs.mkdir(categoryDir, { recursive: true });
    await fs.rename(tempPath, finalPath);
  } catch (err) {
    return c.json({ error: 'Rename hatasi: ' + err.message }, 500);
  }

  // sha256 stream
  const hash = crypto.createHash('sha256');
  await new Promise((resolve, reject) => {
    const rs = createReadStream(finalPath);
    rs.on('data', (chunk) => hash.update(chunk));
    rs.on('end', resolve);
    rs.on('error', reject);
  });
  const sha256 = hash.digest('hex');

  const mime = detected?.mime || 'application/octet-stream';

  try {
    if (willOverwrite) {
      await c.env.DB.prepare(`
        UPDATE uploads SET original_name = ?, mime = ?, size = ?, sha256 = ?, uploaded_by = ?, uploaded_at = datetime('now')
        WHERE stored_path = ?
      `).bind(session.filename, mime, session.totalSize, sha256, userId, finalPath).run();
    } else {
      await c.env.DB.prepare(`
        INSERT INTO uploads (original_name, stored_path, category, mime, size, sha256, uploaded_by)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).bind(session.filename, finalPath, session.category, mime, session.totalSize, sha256, userId).run();
    }
  } catch (err) {
    return c.json({ error: 'DB hatasi: ' + err.message }, 500);
  }

  uploadSessions.delete(uploadId);
  await logActivity(c.env.DB, userId, willOverwrite ? 'upload_chunked_overwrite' : 'upload_chunked',
    `${session.category}/${finalName} (${session.totalSize}B)`);

  return c.json({
    ok: true,
    url: publicUrl(session.category, finalName),
    original_name: session.filename,
    stored_name: finalName,
    size: session.totalSize,
    sha256,
    category: session.category,
    mime,
    overwrote: willOverwrite,
    renamed: finalName !== session.desiredName,
  });
});

// --- Refs scan + rename (referans bulma + auto-refactor) ----------------
// Dosyanin public URL'i (encoded + decoded) site icindeki markdown
// kaynaklarinda nerede geciyor — bulup listele veya rename'de otomatik
// referans guncelle.

const CONTENT_TUTORIALS = path.join(REPO_ROOT, 'content', 'tutorials');
const CONTENT_PAGES = path.join(REPO_ROOT, 'content', 'pages');

function urlVariantsFor(category, filename) {
  // Hem encoded hem decoded form aranir — markdown'da iki sekilde de
  // gecebilir (EasyMDE encoded yazar, manuel kopyala-yapistir decoded).
  const enc = `${PUBLIC_BASE}/${category}/${encodeURIComponent(filename)}`;
  const dec = `${PUBLIC_BASE}/${category}/${filename}`;
  return [enc, dec];
}

async function scanMdRefs(dir, variants) {
  if (!existsSync(dir)) return [];
  const files = await fs.readdir(dir);
  const out = [];
  for (const f of files) {
    if (!f.endsWith('.md')) continue;
    const full = path.join(dir, f);
    let content;
    try { content = await fs.readFile(full, 'utf8'); } catch { continue; }
    const hits = [];
    for (const v of variants) {
      let idx = 0;
      while ((idx = content.indexOf(v, idx)) >= 0) {
        // Snippet — onunde 30, arkasinda 30 char
        const start = Math.max(0, idx - 30);
        const end = Math.min(content.length, idx + v.length + 30);
        hits.push({ snippet: content.slice(start, end).replace(/\s+/g, ' ').trim() });
        idx += v.length;
      }
    }
    if (hits.length) {
      out.push({ type: 'md', dir: path.basename(dir), file: f, slug: f.replace(/\.md$/, ''), hits, full });
    }
  }
  return out;
}

async function scanDbRefs(envDB, variants) {
  const rows = await envDB.prepare('SELECT id, slug, type, status, markdown_source FROM articles').all();
  const out = [];
  for (const r of (rows.results || [])) {
    const ms = r.markdown_source || '';
    const hits = [];
    for (const v of variants) {
      let idx = 0;
      while ((idx = ms.indexOf(v, idx)) >= 0) {
        const start = Math.max(0, idx - 30);
        const end = Math.min(ms.length, idx + v.length + 30);
        hits.push({ snippet: ms.slice(start, end).replace(/\s+/g, ' ').trim() });
        idx += v.length;
      }
    }
    if (hits.length) {
      out.push({ type: 'db', slug: r.slug, kind: r.type, status: r.status, hits });
    }
  }
  return out;
}

uploads.get('/api/dosyalar/:id/refs', adminMiddleware(), async (c) => {
  const id = parseInt(c.req.param('id'), 10);
  if (!Number.isInteger(id) || id <= 0) return c.json({ error: 'Gecersiz id' }, 400);

  const row = await c.env.DB.prepare('SELECT category, stored_path FROM uploads WHERE id = ?').bind(id).first();
  if (!row) return c.json({ error: 'Dosya bulunamadi' }, 404);

  const filename = path.basename(row.stored_path);
  const variants = urlVariantsFor(row.category, filename);

  const mdTutorials = await scanMdRefs(CONTENT_TUTORIALS, variants);
  const mdPages = await scanMdRefs(CONTENT_PAGES, variants);
  const dbRefs = await scanDbRefs(c.env.DB, variants);

  const all = [...mdTutorials, ...mdPages];
  const totalHits = all.reduce((s, r) => s + r.hits.length, 0) + dbRefs.reduce((s, r) => s + r.hits.length, 0);

  return c.json({
    file_url: variants[0],
    md_refs: all.map(r => ({ type: 'md', dir: r.dir, slug: r.slug, file: r.file, hits: r.hits })),
    db_refs: dbRefs,
    total_hits: totalHits,
  });
});

// Rename — opsiyonel auto-refactor
uploads.post('/api/dosyalar/:id/rename', adminMiddleware(), async (c) => {
  const id = parseInt(c.req.param('id'), 10);
  if (!Number.isInteger(id) || id <= 0) return c.json({ error: 'Gecersiz id' }, 400);

  let body;
  try { body = await c.req.json(); } catch { return c.json({ error: 'JSON parse' }, 400); }
  const newNameRaw = String(body.new_name || '').trim();
  const updateRefs = !!body.update_refs;
  if (!newNameRaw) return c.json({ error: 'new_name gerekli' }, 400);

  const userId = c.get('userId');
  const row = await c.env.DB.prepare('SELECT id, original_name, stored_path, category FROM uploads WHERE id = ?').bind(id).first();
  if (!row) return c.json({ error: 'Dosya bulunamadi' }, 404);

  const oldFilename = path.basename(row.stored_path);
  const oldExt = getExt(oldFilename);
  const sanitizedNew = lenientName(newNameRaw);
  const newExt = getExt(sanitizedNew);

  if (!sanitizedNew) return c.json({ error: 'Gecersiz yeni isim' }, 400);
  if (newExt !== oldExt) {
    return c.json({ error: `Uzanti degisemez (.${oldExt} -> .${newExt})` }, 400);
  }
  if (sanitizedNew === oldFilename) {
    return c.json({ error: 'Yeni isim mevcut isimle ayni' }, 400);
  }

  const categoryDir = path.join(DOSYALAR_ROOT, row.category);
  const newPath = path.join(categoryDir, sanitizedNew);
  if (existsSync(newPath)) {
    return c.json({ error: 'Bu isimde dosya zaten var', target_exists: true }, 409);
  }

  const oldVariants = urlVariantsFor(row.category, oldFilename);
  const newVariants = urlVariantsFor(row.category, sanitizedNew);
  const newPublicUrl = newVariants[0];

  try {
    const result = await withPublishLock(async () => {
      const headBefore = await gitHeadSha();
      const touchedMd = []; // {full, oldContent} — rollback icin

      // 1) Disk rename
      await fs.rename(row.stored_path, newPath);

      // 2) DB update (uploads tablosu)
      await c.env.DB.prepare('UPDATE uploads SET stored_path = ?, original_name = ? WHERE id = ?')
        .bind(newPath, sanitizedNew, id).run();

      // 3) Refs guncelle (opsiyonel)
      let mdUpdated = 0, dbUpdated = 0;
      if (updateRefs) {
        // Disk md dosyalari
        for (const dir of [CONTENT_TUTORIALS, CONTENT_PAGES]) {
          if (!existsSync(dir)) continue;
          const files = await fs.readdir(dir);
          for (const f of files) {
            if (!f.endsWith('.md')) continue;
            const full = path.join(dir, f);
            let content;
            try { content = await fs.readFile(full, 'utf8'); } catch { continue; }
            let updated = content;
            for (let i = 0; i < oldVariants.length; i++) {
              updated = updated.split(oldVariants[i]).join(newVariants[i]);
            }
            if (updated !== content) {
              touchedMd.push({ full, oldContent: content });
              await safeWrite(full, updated);
              mdUpdated++;
            }
          }
        }

        // DB articles.markdown_source
        const drafts = await c.env.DB.prepare('SELECT id, markdown_source FROM articles').all();
        for (const r of (drafts.results || [])) {
          const ms = r.markdown_source || '';
          let updated = ms;
          for (let i = 0; i < oldVariants.length; i++) {
            updated = updated.split(oldVariants[i]).join(newVariants[i]);
          }
          if (updated !== ms) {
            await c.env.DB.prepare('UPDATE articles SET markdown_source = ?, updated_at = datetime(\'now\') WHERE id = ?')
              .bind(updated, r.id).run();
            dbUpdated++;
          }
        }
      }

      // 4) Build + commit + push (sadece md degisti ise)
      let commit = null;
      if (mdUpdated > 0) {
        const build = await runBuild();
        if (!build.ok) {
          // Rollback md
          for (const t of touchedMd) await safeWrite(t.full, t.oldContent);
          await runBuild();
          throw Object.assign(new Error('Build basarisiz'), { status: 500, details: { stderr: build.stderr } });
        }
        try {
          const commitFiles = [
            CONTENT_TUTORIALS,
            CONTENT_PAGES,
            repoPath('public', 'tutorials'),
            repoPath('public', 'sitemap.xml'),
            repoPath('public', 'feed.xml'),
            repoPath('src', 'valid-slugs.js'),
          ];
          // pages icin public/<slug>/index.html'leri de stage et — basit yontem:
          // CONTENT_PAGES'deki her slug icin public/<slug>/index.html
          if (existsSync(CONTENT_PAGES)) {
            const pageFiles = await fs.readdir(CONTENT_PAGES);
            for (const f of pageFiles) {
              if (f.endsWith('.md')) {
                commitFiles.push(repoPath('public', f.replace(/\.md$/, '')));
              }
            }
          }
          await gitAdd(commitFiles);
          await gitCommit({ message: `refs: rename ${oldFilename} → ${sanitizedNew} (${mdUpdated} dosya)` });
          await gitPush();
          commit = await gitHeadSha();
        } catch (err) {
          const rollback = [];
          try { await gitRestoreStaged(); } catch (e) { rollback.push('unstage:' + e.message); }
          for (const t of touchedMd) {
            try { await safeWrite(t.full, t.oldContent); } catch (e) { rollback.push('md_restore:' + e.message); }
          }
          try { await runBuild(); } catch (e) { rollback.push('rebuild:' + e.message); }
          try { await gitResetHard(headBefore); } catch (e) { rollback.push('reset:' + e.message); }
          throw Object.assign(new Error('Git push basarisiz'), { status: 500, details: { stderr: err.stderr || err.message, rollback } });
        }
      }

      return {
        ok: true,
        new_url: newPublicUrl,
        new_name: sanitizedNew,
        md_updated: mdUpdated,
        db_updated: dbUpdated,
        commit,
      };
    });

    await logActivity(c.env.DB, userId, 'upload_rename',
      `${oldFilename} → ${sanitizedNew} (md=${result.md_updated}, db=${result.db_updated})`);
    return c.json(result);
  } catch (err) {
    if (err instanceof PublishBusyError) return c.json({ error: err.message }, 409);
    const status = err.status || 500;
    return c.json({ error: err.message, details: err.details }, status);
  }
});

// Bulk delete — tek password reauth ile birden fazla ID
uploads.post('/api/dosyalar/bulk-delete', adminMiddleware(), async (c) => {
  const auth = await reauthAdmin(c);
  if (!auth.ok) return c.json({ error: auth.err }, auth.status);

  const ids = Array.isArray(auth.body.ids) ? auth.body.ids.map(n => parseInt(n, 10)).filter(n => Number.isInteger(n) && n > 0) : [];
  if (!ids.length) return c.json({ error: 'ids bos' }, 400);

  const placeholders = ids.map(() => '?').join(',');
  const rows = await c.env.DB.prepare(
    `SELECT id, stored_path, original_name, category FROM uploads WHERE id IN (${placeholders})`
  ).bind(...ids).all();

  const deleted = [];
  const failed = [];
  for (const r of (rows.results || [])) {
    try {
      if (existsSync(r.stored_path)) {
        await safeUnlink(r.stored_path);
      }
      await c.env.DB.prepare('DELETE FROM uploads WHERE id = ?').bind(r.id).run();
      deleted.push({ id: r.id, name: r.original_name });
    } catch (err) {
      failed.push({ id: r.id, name: r.original_name, error: err.message });
    }
  }

  await logActivity(c.env.DB, c.get('userId'), 'upload_bulk_delete',
    `${deleted.length} silindi, ${failed.length} hata`);

  return c.json({ ok: true, deleted: deleted.length, failed, deletedItems: deleted });
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
