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
import { gitAdd, gitCommit, gitPush, gitHeadSha, gitResetHard } from '../articles/git.js';
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

function articleFiles(slug) {
  return {
    md: repoPath('content', 'tutorials', `${slug}.md`),
    html: repoPath('public', 'tutorials', `${slug}.html`),
    og: repoPath('public', 'og', `${slug}.png`),
    sitemap: repoPath('public', 'sitemap.xml'),
    feed: repoPath('public', 'feed.xml'),
    validSlugs: repoPath('src', 'valid-slugs.js'),
    buildCache: repoPath('scripts', '.build-cache.json'),
  };
}

function commitFilesForPublish(slug) {
  const f = articleFiles(slug);
  return [
    f.md,
    f.og,
    repoPath('public', 'tutorials'),
    f.sitemap,
    f.feed,
    f.validSlugs,
    f.buildCache,
  ];
}

// --- routes ------------------------------------------------------------

// Liste
articles.get('/api/admin/articles', adminMiddleware(), async (c) => {
  const status = c.req.query('status') || '';
  const q = c.req.query('q') || '';
  let sql = `SELECT id, slug, title, description, status, published_at, updated_at, created_at FROM articles`;
  const where = [];
  const params = [];
  if (status && ['draft', 'published', 'archived'].includes(status)) { where.push('status = ?'); params.push(status); }
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

  const exists = await c.env.DB.prepare('SELECT id FROM articles WHERE slug = ?').bind(slug).first();
  if (exists) return c.json({ error: 'Slug zaten kullaniliyor' }, 409);
  if (existsSync(repoPath('content', 'tutorials', `${slug}.md`))) {
    return c.json({ error: 'Slug filesystem\'de mevcut' }, 409);
  }

  const fmInput = {
    title: body.title || '',
    description: body.description || '',
    keywords: Array.isArray(body.keywords) ? body.keywords : [],
    article_section: body.article_section || '',
    published_at: body.published_at || new Date().toISOString().slice(0, 10),
  };
  const errors = validateFrontmatter(fmInput);
  if (errors.length) return c.json({ error: 'Frontmatter hatali', details: errors }, 400);

  const fmYaml = frontmatterYaml({ ...fmInput, ...(body.faq ? { faq: body.faq } : {}) });
  await c.env.DB.prepare(`
    INSERT INTO articles (slug, title, description, keywords, article_section, status,
                          markdown_source, frontmatter_yaml, published_at, updated_at, created_by)
    VALUES (?, ?, ?, ?, ?, 'draft', ?, ?, ?, ?, ?)
  `).bind(
    slug, fmInput.title, fmInput.description, fmInput.keywords.join(', '),
    fmInput.article_section, body.body || '', fmYaml,
    fmInput.published_at, fmInput.published_at, c.get('userId')
  ).run();
  await logActivity(c.env.DB, c.get('userId'), 'create_article', slug);
  return c.json({ ok: true, slug });
});

// Draft guncelle
articles.put('/api/admin/articles/:slug', adminMiddleware(), async (c) => {
  const slug = c.req.param('slug');
  if (validateSlug(slug)) return c.json({ error: 'Gecersiz slug' }, 400);
  const row = await c.env.DB.prepare('SELECT * FROM articles WHERE slug = ?').bind(slug).first();
  if (!row) return c.json({ error: 'Makale bulunamadi' }, 404);

  const body = await c.req.json().catch(() => ({}));
  const fmInput = {
    title: body.title ?? row.title,
    description: body.description ?? row.description,
    keywords: Array.isArray(body.keywords) ? body.keywords : (row.keywords || '').split(',').map(s => s.trim()).filter(Boolean),
    article_section: body.article_section ?? row.article_section,
    published_at: body.published_at ?? row.published_at,
  };
  const errors = validateFrontmatter(fmInput);
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
  const fmInput = {
    title: body.title || '',
    description: body.description || '',
    keywords: Array.isArray(body.keywords) ? body.keywords : [],
    article_section: body.article_section || '',
    published_at: body.published_at || '2026-01-01',
  };
  if (body.faq) fmInput.faq = body.faq;
  const warnings = validateFrontmatter(fmInput);
  const { html, wordCount, readMinutes } = renderPreview({ body: body.body || '' });
  return c.json({ html, wordCount, readMinutes, warnings });
});

// Yayinla
articles.post('/api/admin/articles/:slug/publish', adminMiddleware(), async (c) => {
  const slug = c.req.param('slug');
  if (validateSlug(slug)) return c.json({ error: 'Gecersiz slug' }, 400);

  const user = await c.env.DB.prepare('SELECT username FROM users WHERE id = ?').bind(c.get('userId')).first();
  const username = user?.username || 'admin';

  try {
    const result = await withPublishLock(async () => {
      const row = await c.env.DB.prepare('SELECT * FROM articles WHERE slug = ?').bind(slug).first();
      if (!row) throw Object.assign(new Error('Makale bulunamadi'), { status: 404 });
      if (!['draft', 'published'].includes(row.status)) {
        throw Object.assign(new Error(`Bu durumdan yayinlanamaz: ${row.status}`), { status: 400 });
      }
      if (!row.markdown_source || !row.markdown_source.trim()) {
        throw Object.assign(new Error('Markdown govde bos — once kaynak ekleyin'), { status: 400 });
      }

      const reqBody = await c.req.json().catch(() => ({}));
      const fm = buildFrontmatter(row, reqBody);
      const errors = validateFrontmatter(fm);
      if (errors.length) throw Object.assign(new Error('Frontmatter hatali'), { status: 400, details: errors });

      const f = articleFiles(slug);
      const filesBefore = {
        md: existsSync(f.md) ? await safeRead(f.md) : null,
        og: existsSync(f.og) ? null : null, // PNG binary; rollback'te yeniden uretilir
      };
      const headBefore = await gitHeadSha();

      // Snapshot prior DB state
      await c.env.DB.prepare(
        'INSERT INTO article_versions (article_id, markdown_source, frontmatter_yaml, created_by) VALUES (?, ?, ?, ?)'
      ).bind(row.id, row.markdown_source, row.frontmatter_yaml, c.get('userId')).run();

      const fmYaml = frontmatterYaml(fm);

      // 1) .md dosyasini yaz
      const mdContent = buildMarkdownFile({ frontmatter: fm, body: row.markdown_source });
      await safeWrite(f.md, mdContent);

      // 2) OG gorseli — yoksa uret
      if (!existsSync(f.og)) {
        const png = generateOgImagePng({ title: fm.title, slug });
        await safeWrite(f.og, png);
      }

      // 3) Pipeline calistir
      const build = await runBuild();
      if (!build.ok) {
        // rollback file
        if (filesBefore.md !== null) await safeWrite(f.md, filesBefore.md);
        else await safeUnlink(f.md);
        throw Object.assign(new Error('Build basarisiz'), { status: 500, details: { stderr: build.stderr, stdout: build.stdout } });
      }

      // 4) Git: add + commit + push
      try {
        await gitAdd(commitFilesForPublish(slug));
        await gitCommit({ message: `publish: ${slug} by ${username}` });
        await gitPush();
      } catch (err) {
        // rollback: prior md geri yaz, build tekrar, git reset
        if (filesBefore.md !== null) await safeWrite(f.md, filesBefore.md);
        else await safeUnlink(f.md);
        await runBuild({ force: false });
        try { await gitResetHard(headBefore); } catch {}
        throw Object.assign(new Error('Git push basarisiz'), { status: 500, details: { stderr: err.stderr || err.message } });
      }

      // 5) DB UPDATE
      await c.env.DB.prepare(`
        UPDATE articles SET status = 'published',
          frontmatter_yaml = ?,
          published_at = COALESCE(published_at, ?),
          updated_at = datetime('now')
        WHERE id = ?
      `).bind(fmYaml, fm.published_at, row.id).run();

      const headAfter = await gitHeadSha();
      return { ok: true, slug, url: `https://amator.tr/tutorials/${slug}`, commit: headAfter };
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

      const f = articleFiles(slug);
      const headBefore = await gitHeadSha();
      const mdBefore = existsSync(f.md) ? await safeRead(f.md) : null;

      await c.env.DB.prepare(
        'INSERT INTO article_versions (article_id, markdown_source, frontmatter_yaml, created_by) VALUES (?, ?, ?, ?)'
      ).bind(row.id, row.markdown_source, row.frontmatter_yaml, c.get('userId')).run();

      // .md ve OG sil; pipeline orphan sweep ile HTML'i temizleyecek
      await safeUnlink(f.md);
      await safeUnlink(f.og);

      const build = await runBuild();
      if (!build.ok) {
        if (mdBefore !== null) await safeWrite(f.md, mdBefore);
        await runBuild();
        throw Object.assign(new Error('Build basarisiz'), { status: 500, details: { stderr: build.stderr } });
      }

      try {
        await gitAdd(commitFilesForPublish(slug));
        await gitCommit({ message: `unpublish: ${slug} by ${username}` });
        await gitPush();
      } catch (err) {
        if (mdBefore !== null) await safeWrite(f.md, mdBefore);
        await runBuild();
        try { await gitResetHard(headBefore); } catch {}
        throw Object.assign(new Error('Git push basarisiz'), { status: 500, details: { stderr: err.stderr || err.message } });
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
