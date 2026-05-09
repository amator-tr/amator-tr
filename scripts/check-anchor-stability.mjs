#!/usr/bin/env node
// Compare anchor IDs that the existing public/tutorials/<slug>.html files use
// against the IDs slugifyHeading() will produce when the same headings are
// rendered from content/tutorials/<slug>.md by markdown-it-anchor.
//
// Failures here mean external links to `#anchor-id` would break after the
// MD->HTML migration. Either tune slugify, or add a per-article anchor
// override in frontmatter.

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import * as cheerio from 'cheerio';
import matter from 'gray-matter';
import { createRenderer } from './lib/render.mjs';

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const PUBLIC_TUTORIALS = path.join(ROOT, 'public/tutorials');
const CONTENT_DIR = path.join(ROOT, 'content/tutorials');

function listExistingIDs(html) {
  const $ = cheerio.load(html, { decodeEntities: true });
  const ids = [];
  $('article.prose h2[id], article.prose h3[id], article.prose h4[id]').each((_, el) => {
    ids.push({ tag: el.tagName, id: $(el).attr('id'), text: $(el).clone().find('a.anchor-link').remove().end().text().trim() });
  });
  return ids;
}

function listGeneratedIDs(md) {
  // Render via the canonical pipeline, then extract h2/h3/h4 IDs from the
  // resulting HTML — guarantees the check matches what the build will emit.
  const html = createRenderer().render(md);
  const out = [];
  const re = /<(h[234])\s+id="([^"]+)"[^>]*>(?:<a[^>]*>#<\/a>)?([^<]*)/g;
  let m;
  while ((m = re.exec(html))) {
    out.push({ tag: m[1], id: m[2], text: m[3].trim() });
  }
  return out;
}

function main() {
  const mdFiles = fs.existsSync(CONTENT_DIR)
    ? fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'))
    : [];

  if (mdFiles.length === 0) {
    console.error('No content/tutorials/*.md found. Run `npm run extract` first.');
    process.exit(1);
  }

  // The check that matters for link-breakage: every id present in the existing
  // HTML must still be produced by the generator. Extra ids on previously
  // unattached headings are fine (purely additive).
  let totalArticles = 0, articlesWithMissing = 0, totalMissing = 0;
  for (const f of mdFiles) {
    const slug = f.replace(/\.md$/, '');
    const htmlPath = path.join(PUBLIC_TUTORIALS, `${slug}.html`);
    if (!fs.existsSync(htmlPath)) continue;

    totalArticles++;
    const html = fs.readFileSync(htmlPath, 'utf8');
    const md = matter(fs.readFileSync(path.join(CONTENT_DIR, f), 'utf8')).content;

    const expected = listExistingIDs(html);
    const generated = listGeneratedIDs(md);

    const generatedSet = new Set(generated.map(x => x.id));
    const missing = expected.filter(e => !generatedSet.has(e.id));

    if (missing.length === 0) continue;

    articlesWithMissing++;
    totalMissing += missing.length;
    console.log(`\n=== ${slug} ===  ${missing.length} id(s) lost`);
    for (const m of missing) {
      console.log(`  - ${m.tag}#${m.id}  "${m.text}"`);
    }
  }

  console.log(`\nArticles checked: ${totalArticles}`);
  console.log(`Articles with missing ids: ${articlesWithMissing}`);
  console.log(`Total missing ids: ${totalMissing}`);

  if (articlesWithMissing > 0) process.exit(1);
}

main();
