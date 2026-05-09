// content/tutorials/<slug>.md -> articles tablosu (idempotent INSERT OR IGNORE).
// Migrate sirasinda bir kez calisir; sonradan eklenen .md'ler icin yine
// idempotent — yeni slug'lar eklenir, mevcutler dokunulmaz (admin yayini
// dogrudan UPDATE yapar, backfill bypass).

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const CONTENT_DIR = path.resolve('content/tutorials');
const PAGES_DIR = path.resolve('content/pages');

function asKeywordsString(keywords) {
  if (Array.isArray(keywords)) return keywords.join(', ');
  if (typeof keywords === 'string') return keywords;
  return '';
}

function asISODate(value) {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}

export function backfillArticles(rawDb) {
  // Tutorial backfill (content/tutorials -> articles type='tutorial')
  const insertTutorial = rawDb.prepare(`
    INSERT OR IGNORE INTO articles
      (slug, type, title, description, keywords, article_section, status,
       markdown_source, frontmatter_yaml, published_at, updated_at, created_by)
    VALUES (?, 'tutorial', ?, ?, ?, ?, 'published', ?, ?, ?, ?, NULL)
  `);

  // Page backfill (content/pages -> articles type='page')
  const insertPage = rawDb.prepare(`
    INSERT OR IGNORE INTO articles
      (slug, type, title, description, keywords, article_section, status,
       markdown_source, frontmatter_yaml, published_at, updated_at, created_by)
    VALUES (?, 'page', ?, ?, '', '', 'published', ?, ?, ?, ?, NULL)
  `);

  let inserted = 0, skipped = 0;

  function processDir(dir, kind) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const slug = file.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const parsed = matter(raw);
      const fm = parsed.data || {};
      const body = parsed.content || '';
      const fmYaml = matter.stringify('', fm).replace(/^---\n|\n---\n?$/g, '').trim();
      const today = new Date().toISOString().slice(0, 10);

      let result;
      if (kind === 'page') {
        result = insertPage.run(
          slug,
          String(fm.title || slug),
          String(fm.description || ''),
          body,
          fmYaml,
          asISODate(fm.published_at) || today,
          asISODate(fm.updated_at || fm.published_at) || today,
        );
      } else {
        result = insertTutorial.run(
          slug,
          String(fm.title || slug),
          String(fm.description || ''),
          asKeywordsString(fm.keywords),
          String(fm.article_section || ''),
          body,
          fmYaml,
          asISODate(fm.published_at),
          asISODate(fm.updated_at || fm.published_at),
        );
      }
      if (result.changes > 0) inserted++; else skipped++;
    }
  }

  const tx = rawDb.transaction(() => {
    processDir(CONTENT_DIR, 'tutorial');
    processDir(PAGES_DIR, 'page');
  });
  tx();

  return { inserted, skipped };
}
