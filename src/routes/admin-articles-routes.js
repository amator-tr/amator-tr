// Admin makale yayinlama akisi. Mevcut MD->HTML pipeline'i (scripts/build.mjs)
// reuse edilir; admin sadece content/tutorials/<slug>.md'yi yazar, build'i
// tetikler ve sonucu git'e push eder.

import { Hono } from 'hono';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { adminMiddleware, hashPassword, timingSafeEqualHex, CURRENT_ITERATIONS, LEGACY_ITERATIONS } from '../auth.js';
import { logActivity } from '../helpers.js';
import { withPublishLock, PublishBusyError } from '../articles/lock.js';
import { safeWrite, safeUnlink, safeRead, repoPath } from '../articles/files.js';
import { buildMarkdownFile, frontmatterYaml } from '../articles/serialize.js';
import { renderPreview, sanitize } from '../articles/preview.js';
import { generateOgImagePng } from '../articles/og.js';
import { runBuild } from '../articles/build.js';
import { gitAdd, gitCommit, gitPush, gitHeadSha, gitResetHard, gitRestoreStaged } from '../articles/git.js';
import { validateSlug, validateFrontmatter } from '../articles/validate.js';

const REPO_ROOT = path.resolve(process.env.REPO_ROOT || process.cwd());

const articles = new Hono();

// --- helpers -----------------------------------------------------------

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

function buildFrontmatter(row, body) {
  const fm = {
    title: row.title,
    description: row.description,
    keywords: (row.keywords || '').split(',').map(s => s.trim()).filter(Boolean),
    article_section: row.article_section || '',
    published_at: row.published_at,
    updated_at: row.updated_at || row.published_at,
  };
  if (body && body.faq && Array.isArray(body.faq)) fm.faq = body.faq;
  return fm;
}

function normalizeType(t) {
  return t === 'page' ? 'page' : 'tutorial';
}

function articleFiles(slug, type = 'tutorial') {
  if (type === 'page') {
    return {
      type: 'page',
      md: repoPath('content', 'pages', `${slug}.md`),
      html: repoPath('public', slug, 'index.html'),
      htmlDir: repoPath('public', slug),
      og: null,
      sitemap: repoPath('public', 'sitemap.xml'),
      feed: repoPath('public', 'feed.xml'),
      validSlugs: repoPath('src', 'valid-slugs.js'),
    };
  }
  return {
    type: 'tutorial',
    md: repoPath('content', 'tutorials', `${slug}.md`),
    html: repoPath('public', 'tutorials', `${slug}.html`),
    og: repoPath('public', 'og', `${slug}.png`),
    sitemap: repoPath('public', 'sitemap.xml'),
    feed: repoPath('public', 'feed.xml'),
    validSlugs: repoPath('src', 'valid-slugs.js'),
    buildCache: repoPath('scripts', '.build-cache.json'),
  };
}

function commitFilesForPublish(slug, type = 'tutorial') {
  const f = articleFiles(slug, type);
  if (type === 'page') {
    return [f.md, f.htmlDir, f.sitemap, f.feed, f.validSlugs];
  }
  return [f.md, f.og, repoPath('public', 'tutorials'), f.sitemap, f.feed, f.validSlugs];
}

function publishedUrl(slug, type) {
  return type === 'page' ? `https://amator.tr/${slug}/` : `https://amator.tr/tutorials/${slug}`;
}

// --- routes ------------------------------------------------------------

// Liste
articles.get('/api/admin/articles', adminMiddleware(), async (c) => {
  const status = c.req.query('status') || '';
  const q = c.req.query('q') || '';
  const type = c.req.query('type') || '';
  let sql = `SELECT id, slug, title, description, status, type, published_at, updated_at, created_at FROM articles`;
  const where = [];
  const params = [];
  if (status && ['draft', 'published', 'archived'].includes(status)) { where.push('status = ?'); params.push(status); }
  if (type && ['tutorial', 'page'].includes(type)) { where.push('type = ?'); params.push(type); }
  if (q) { where.push('(slug LIKE ? OR title LIKE ?)'); params.push(`%${q}%`, `%${q}%`); }
  if (where.length) sql += ' WHERE ' + where.join(' AND ');
  sql += ' ORDER BY COALESCE(updated_at, created_at) DESC LIMIT 200';
  const rows = await c.env.DB.prepare(sql).bind(...params).all();
  return c.json({ articles: rows.results });
});

// Tek kayit
articles.get('/api/admin/articles/:slug', adminMiddleware(), async (c) => {
  const slug = c.req.param('slug');
  if (validateSlug(slug)) return c.json({ error: 'Gecersiz slug' }, 400);
  const row = await c.env.DB.prepare('SELECT * FROM articles WHERE slug = ?').bind(slug).first();
  if (!row) return c.json({ error: 'Makale bulunamadi' }, 404);
  return c.json({ article: row });
});

// Version gecmisi
articles.get('/api/admin/articles/:slug/versions', adminMiddleware(), async (c) => {
  const slug = c.req.param('slug');
  if (validateSlug(slug)) return c.json({ error: 'Gecersiz slug' }, 400);
  const row = await c.env.DB.prepare('SELECT id FROM articles WHERE slug = ?').bind(slug).first();
  if (!row) return c.json({ error: 'Makale bulunamadi' }, 404);
  const versions = await c.env.DB.prepare(
    'SELECT id, created_by, created_at, length(markdown_source) AS md_len FROM article_versions WHERE article_id = ? ORDER BY id DESC LIMIT 50'
  ).bind(row.id).all();
  return c.json({ versions: versions.results });
});

// Draft olustur
articles.post('/api/admin/articles', adminMiddleware(), async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const slug = String(body.slug || '').trim();
  const slugErr = validateSlug(slug);
  if (slugErr) return c.json({ error: slugErr }, 400);
  const type = normalizeType(body.type);

  const exists = await c.env.DB.prepare('SELECT id FROM articles WHERE slug = ?').bind(slug).first();
  if (exists) return c.json({ error: 'Slug zaten kullaniliyor' }, 409);
  if (existsSync(articleFiles(slug, type).md)) {
    return c.json({ error: 'Slug filesystem\'de mevcut' }, 409);
  }

  const fmInput = {
    title: body.title || '',
    description: body.description || '',
    keywords: Array.isArray(body.keywords) ? body.keywords : [],
    article_section: body.article_section || '',
    published_at: body.published_at || new Date().toISOString().slice(0, 10),
  };
  const errors = validateFrontmatter(fmInput, type);
  if (errors.length) return c.json({ error: 'Frontmatter hatali', details: errors }, 400);

  const fmYaml = frontmatterYaml({ ...fmInput, ...(body.faq ? { faq: body.faq } : {}) });
  await c.env.DB.prepare(`
    INSERT INTO articles (slug, type, title, description, keywords, article_section, status,
                          markdown_source, frontmatter_yaml, published_at, updated_at, created_by)
    VALUES (?, ?, ?, ?, ?, ?, 'draft', ?, ?, ?, ?, ?)
  `).bind(
    slug, type, fmInput.title, fmInput.description, fmInput.keywords.join(', '),
    fmInput.article_section, body.body || '', fmYaml,
    fmInput.published_at, fmInput.published_at, c.get('userId')
  ).run();
  await logActivity(c.env.DB, c.get('userId'), 'create_article', `${slug} (${type})`);
  return c.json({ ok: true, slug, type });
});

// Draft guncelle
articles.put('/api/admin/articles/:slug', adminMiddleware(), async (c) => {
  const slug = c.req.param('slug');
  if (validateSlug(slug)) return c.json({ error: 'Gecersiz slug' }, 400);
  const row = await c.env.DB.prepare('SELECT * FROM articles WHERE slug = ?').bind(slug).first();
  if (!row) return c.json({ error: 'Makale bulunamadi' }, 404);

  const body = await c.req.json().catch(() => ({}));
  const type = normalizeType(row.type);
  const fmInput = {
    title: body.title ?? row.title,
    description: body.description ?? row.description,
    keywords: Array.isArray(body.keywords) ? body.keywords : (row.keywords || '').split(',').map(s => s.trim()).filter(Boolean),
    article_section: body.article_section ?? row.article_section,
    published_at: body.published_at ?? row.published_at,
  };
  const errors = validateFrontmatter(fmInput, type);
  if (errors.length) return c.json({ error: 'Frontmatter hatali', details: errors }, 400);

  const fmYaml = frontmatterYaml({ ...fmInput, ...(body.faq ? { faq: body.faq } : {}) });
  await c.env.DB.prepare(`
    UPDATE articles SET title = ?, description = ?, keywords = ?, article_section = ?,
                        markdown_source = ?, frontmatter_yaml = ?, published_at = ?, updated_at = datetime('now')
    WHERE slug = ?
  `).bind(
    fmInput.title, fmInput.description, fmInput.keywords.join(', '),
    fmInput.article_section, body.body ?? row.markdown_source, fmYaml,
    fmInput.published_at, slug
  ).run();
  await logActivity(c.env.DB, c.get('userId'), 'update_article', slug);
  return c.json({ ok: true });
});

// Onizleme — dosya yazmaz, build cagirmaz
articles.post('/api/admin/articles/preview', adminMiddleware(), async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const type = normalizeType(body.type);
  const fmInput = {
    title: body.title || '',
    description: body.description || '',
    keywords: Array.isArray(body.keywords) ? body.keywords : [],
    article_section: body.article_section || '',
    published_at: body.published_at || '2026-01-01',
  };
  if (body.faq) fmInput.faq = body.faq;
  const warnings = validateFrontmatter(fmInput, type);
  const { html, wordCount, readMinutes } = renderPreview({ body: body.body || '' });
  return c.json({ html, wordCount, readMinutes, warnings });
});

// Yayinla — form alanlarini kabul eder, gerekirse draft olusturur, sonra yayinlar.
// Boylece "once Save Draft" tek tikla ortadan kalkar.
articles.post('/api/admin/articles/:slug/publish', adminMiddleware(), async (c) => {
  const slug = c.req.param('slug');
  if (validateSlug(slug)) return c.json({ error: 'Gecersiz slug' }, 400);

  const reqBody = await c.req.json().catch(() => ({}));
  const fm = {
    title: String(reqBody.title || '').trim(),
    description: String(reqBody.description || '').trim(),
    keywords: Array.isArray(reqBody.keywords) ? reqBody.keywords.map(s => String(s).trim()).filter(Boolean) : [],
    article_section: String(reqBody.article_section || '').trim(),
    published_at: String(reqBody.published_at || '').trim(),
  };
  if (reqBody.faq && Array.isArray(reqBody.faq) && reqBody.faq.length) fm.faq = reqBody.faq;
  const bodyMd = String(reqBody.body || '');

  if (!bodyMd.trim()) return c.json({ error: 'Markdown govde bos' }, 400);

  const user = await c.env.DB.prepare('SELECT username FROM users WHERE id = ?').bind(c.get('userId')).first();
  const username = user?.username || 'admin';

  try {
    const result = await withPublishLock(async () => {
      // Upsert: row yoksa draft olarak ac
      let row = await c.env.DB.prepare('SELECT * FROM articles WHERE slug = ?').bind(slug).first();
      // Mevcut row'un type'i one cikar; yoksa istek body'sinden, o da yoksa tutorial.
      const type = row ? normalizeType(row.type) : normalizeType(reqBody.type);

      // Pages icin published_at opsiyonel — bos ise bugun.
      if (type === 'page' && !fm.published_at) {
        fm.published_at = new Date().toISOString().slice(0, 10);
      }

      const errors = validateFrontmatter(fm, type);
      if (errors.length) throw Object.assign(new Error('Frontmatter hatali'), { status: 400, details: errors });

      const fmYaml = frontmatterYaml(fm);

      if (!row) {
        if (existsSync(articleFiles(slug, type).md)) {
          throw Object.assign(new Error("Slug filesystem'de mevcut"), { status: 409 });
        }
        await c.env.DB.prepare(`
          INSERT INTO articles (slug, type, title, description, keywords, article_section, status,
                                markdown_source, frontmatter_yaml, published_at, updated_at, created_by)
          VALUES (?, ?, ?, ?, ?, ?, 'draft', ?, ?, ?, ?, ?)
        `).bind(
          slug, type, fm.title, fm.description, fm.keywords.join(', '),
          fm.article_section, bodyMd, fmYaml, fm.published_at, fm.published_at, c.get('userId')
        ).run();
        row = await c.env.DB.prepare('SELECT * FROM articles WHERE slug = ?').bind(slug).first();
      } else if (!['draft', 'published', 'archived'].includes(row.status)) {
        throw Object.assign(new Error(`Bu durumdan yayinlanamaz: ${row.status}`), { status: 400 });
      }

      const f = articleFiles(slug, type);
      const filesBefore = {
        md: existsSync(f.md) ? await safeRead(f.md) : null,
        ogExisted: f.og ? existsSync(f.og) : false,
      };
      const headBefore = await gitHeadSha();

      // Snapshot prior DB state
      await c.env.DB.prepare(
        'INSERT INTO article_versions (article_id, markdown_source, frontmatter_yaml, created_by) VALUES (?, ?, ?, ?)'
      ).bind(row.id, row.markdown_source, row.frontmatter_yaml, c.get('userId')).run();

      // Form degerlerini DB'ye yansit (build oncesi — .md ile DB tutarli olsun)
      await c.env.DB.prepare(`
        UPDATE articles SET title = ?, description = ?, keywords = ?, article_section = ?,
          markdown_source = ?, frontmatter_yaml = ?, published_at = ?, updated_at = datetime('now')
        WHERE id = ?
      `).bind(
        fm.title, fm.description, fm.keywords.join(', '),
        fm.article_section, bodyMd, fmYaml, fm.published_at, row.id
      ).run();

      // 1) .md dosyasini yaz
      const mdContent = buildMarkdownFile({ frontmatter: fm, body: bodyMd });
      await safeWrite(f.md, mdContent);

      // 2) OG yoksa uret (sadece tutorial — pages default OG kullanir)
      if (f.og && !existsSync(f.og)) {
        const png = generateOgImagePng({ title: fm.title, slug });
        await safeWrite(f.og, png);
      }

      // 3) Pipeline
      const build = await runBuild();
      if (!build.ok) {
        if (filesBefore.md !== null) await safeWrite(f.md, filesBefore.md);
        else await safeUnlink(f.md);
        throw Object.assign(new Error('Build basarisiz'), { status: 500, details: { stderr: build.stderr, stdout: build.stdout } });
      }

      // 4) Git: gitAdd partial-stage edebilir; her hata sonrasi rollback
      //    once index'i temizler, sonra disk'i restore eder, sonra build'i
      //    tekrar calistirir, sonra reset --hard headBefore.
      try {
        await gitAdd(commitFilesForPublish(slug, type));
        await gitCommit({ message: `publish: ${slug} (${type}) by ${username}` });
        await gitPush();
      } catch (err) {
        const rollbackErrors = [];
        try { await gitRestoreStaged(); } catch (e) { rollbackErrors.push('unstage:' + e.message); }
        try {
          if (filesBefore.md !== null) await safeWrite(f.md, filesBefore.md);
          else await safeUnlink(f.md);
        } catch (e) { rollbackErrors.push('md_restore:' + e.message); }
        try {
          if (f.og && !filesBefore.ogExisted) await safeUnlink(f.og);
        } catch (e) { rollbackErrors.push('og_unlink:' + e.message); }
        try { await runBuild(); } catch (e) { rollbackErrors.push('rebuild:' + e.message); }
        try { await gitResetHard(headBefore); } catch (e) { rollbackErrors.push('reset:' + e.message); }
        throw Object.assign(new Error('Yayinlama basarisiz'), {
          status: 500,
          details: { stderr: err.stderr || err.message, rollback: rollbackErrors }
        });
      }

      // 5) status='published'
      await c.env.DB.prepare(`
        UPDATE articles SET status = 'published',
          published_at = COALESCE(published_at, ?),
          updated_at = datetime('now')
        WHERE id = ?
      `).bind(fm.published_at, row.id).run();

      const headAfter = await gitHeadSha();
      return { ok: true, slug, type, url: publishedUrl(slug, type), commit: headAfter };
    });

    await logActivity(c.env.DB, c.get('userId'), 'publish_article', slug);
    return c.json(result);
  } catch (err) {
    if (err instanceof PublishBusyError) return c.json({ error: err.message }, 409);
    const status = err.status || 500;
    await logActivity(c.env.DB, c.get('userId'), 'publish_failed', `${slug}: ${err.message}`);
    return c.json({ error: err.message, details: err.details }, status);
  }
});

// Sil — sadece draft/archived. Published once unpublish edilmeli (git history
// commit edilmis, dogrudan silmek yanlis).
articles.delete('/api/admin/articles/:slug', adminMiddleware(), async (c) => {
  const slug = c.req.param('slug');
  if (validateSlug(slug)) return c.json({ error: 'Gecersiz slug' }, 400);
  const row = await c.env.DB.prepare('SELECT id, status FROM articles WHERE slug = ?').bind(slug).first();
  if (!row) return c.json({ error: 'Makale bulunamadi' }, 404);
  if (row.status === 'published') {
    return c.json({ error: 'Yayindaki makale silinemez. Once "Yayindan kaldir" yapilmali.' }, 400);
  }
  await c.env.DB.prepare('DELETE FROM articles WHERE id = ?').bind(row.id).run();
  await logActivity(c.env.DB, c.get('userId'), 'delete_article', `${slug} (${row.status})`);
  return c.json({ ok: true, slug });
});

// Yayindan kaldir — re-auth gerekli
articles.post('/api/admin/articles/:slug/unpublish', adminMiddleware(), async (c) => {
  const slug = c.req.param('slug');
  if (validateSlug(slug)) return c.json({ error: 'Gecersiz slug' }, 400);

  const auth = await reauthAdmin(c);
  if (!auth.ok) return c.json({ error: auth.err }, auth.status);

  const user = await c.env.DB.prepare('SELECT username FROM users WHERE id = ?').bind(c.get('userId')).first();
  const username = user?.username || 'admin';

  try {
    const result = await withPublishLock(async () => {
      const row = await c.env.DB.prepare('SELECT * FROM articles WHERE slug = ?').bind(slug).first();
      if (!row) throw Object.assign(new Error('Makale bulunamadi'), { status: 404 });
      if (row.status !== 'published') {
        throw Object.assign(new Error(`Bu durumdan kaldirilamaz: ${row.status}`), { status: 400 });
      }

      const type = normalizeType(row.type);
      const f = articleFiles(slug, type);
      const headBefore = await gitHeadSha();
      const mdBefore = existsSync(f.md) ? await safeRead(f.md) : null;

      await c.env.DB.prepare(
        'INSERT INTO article_versions (article_id, markdown_source, frontmatter_yaml, created_by) VALUES (?, ?, ?, ?)'
      ).bind(row.id, row.markdown_source, row.frontmatter_yaml, c.get('userId')).run();

      // .md ve OG sil; pipeline orphan sweep ile HTML'i temizleyecek
      await safeUnlink(f.md);
      if (f.og) await safeUnlink(f.og);
      // Pages icin orphan sweep yok — html dizinini de elle sil
      if (type === 'page') {
        try {
          const fs = await import('node:fs/promises');
          await fs.rm(f.htmlDir, { recursive: true, force: true });
        } catch {}
      }

      const build = await runBuild();
      if (!build.ok) {
        if (mdBefore !== null) await safeWrite(f.md, mdBefore);
        await runBuild();
        throw Object.assign(new Error('Build basarisiz'), { status: 500, details: { stderr: build.stderr } });
      }

      try {
        await gitAdd(commitFilesForPublish(slug, type));
        await gitCommit({ message: `unpublish: ${slug} (${type}) by ${username}` });
        await gitPush();
      } catch (err) {
        const rollbackErrors = [];
        try { await gitRestoreStaged(); } catch (e) { rollbackErrors.push('unstage:' + e.message); }
        try { if (mdBefore !== null) await safeWrite(f.md, mdBefore); } catch (e) { rollbackErrors.push('md_restore:' + e.message); }
        try { await runBuild(); } catch (e) { rollbackErrors.push('rebuild:' + e.message); }
        try { await gitResetHard(headBefore); } catch (e) { rollbackErrors.push('reset:' + e.message); }
        throw Object.assign(new Error('Yayindan kaldirma basarisiz'), {
          status: 500,
          details: { stderr: err.stderr || err.message, rollback: rollbackErrors }
        });
      }

      await c.env.DB.prepare(`UPDATE articles SET status = 'archived', updated_at = datetime('now') WHERE id = ?`).bind(row.id).run();
      const headAfter = await gitHeadSha();
      return { ok: true, slug, commit: headAfter };
    });

    await logActivity(c.env.DB, c.get('userId'), 'unpublish_article', slug);
    return c.json(result);
  } catch (err) {
    if (err instanceof PublishBusyError) return c.json({ error: err.message }, 409);
    const status = err.status || 500;
    await logActivity(c.env.DB, c.get('userId'), 'unpublish_failed', `${slug}: ${err.message}`);
    return c.json({ error: err.message, details: err.details }, status);
  }
});

export default articles;
