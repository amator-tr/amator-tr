// content/tutorials/<slug>.md -> articles tablosu (idempotent INSERT OR IGNORE).
// Migrate sirasinda bir kez calisir; sonradan eklenen .md'ler icin yine
// idempotent — yeni slug'lar eklenir, mevcutler dokunulmaz (admin yayini
// dogrudan UPDATE yapar, backfill bypass).

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const CONTENT_DIR = path.resolve('content/tutorials');

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
  if (!fs.existsSync(CONTENT_DIR)) return { inserted: 0, skipped: 0 };

  const insert = rawDb.prepare(`
    INSERT OR IGNORE INTO articles
      (slug, title, description, keywords, article_section, status,
       markdown_source, frontmatter_yaml, published_at, updated_at, created_by)
    VALUES (?, ?, ?, ?, ?, 'published', ?, ?, ?, ?, NULL)
  `);

  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
  let inserted = 0, skipped = 0;

  const tx = rawDb.transaction(() => {
    for (const file of files) {
      const slug = file.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
      const parsed = matter(raw);
      const fm = parsed.data || {};
      const body = parsed.content || '';

      // gray-matter parse'i frontmatter'in YAML kaynagini saklamiyor —
      // round-trip icin matter.stringify kullanilacak. Backfill'de YAML
      // raw'i tekrar serialize edip saklariz; admin update'inde de bu yol.
      const fmYaml = matter.stringify('', fm).replace(/^---\n|\n---\n?$/g, '').trim();

      const result = insert.run(
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
      if (result.changes > 0) inserted++; else skipped++;
    }
  });
  tx();

  return { inserted, skipped };
}
