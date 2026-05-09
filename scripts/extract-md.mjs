#!/usr/bin/env node
// One-shot reverse extraction: parse public/tutorials/*.html and emit
// content/tutorials/<slug>.md with frontmatter + markdown body.
//
// After running this, run:
//   npm run check-anchors      # verify slugify produces stable IDs
//   npm run build:force         # regenerate HTML and diff against git

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import matter from 'gray-matter';

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const PUBLIC_TUTORIALS = path.join(ROOT, 'public/tutorials');
const CONTENT_DIR = path.join(ROOT, 'content/tutorials');

fs.mkdirSync(CONTENT_DIR, { recursive: true });

function makeTurndown() {
  const td = new TurndownService({
    headingStyle: 'atx',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
    fence: '```',
    emDelimiter: '_',
    strongDelimiter: '**',
    linkStyle: 'inlined',
  });
  td.use(gfm);
  return td;
}

function findJsonLD($, type) {
  for (const el of $('script[type="application/ld+json"]')) {
    const txt = $(el).text().trim();
    try {
      const obj = JSON.parse(txt);
      if (obj['@type'] === type) return obj;
    } catch {}
  }
  return null;
}

function findAllJsonLD($) {
  const out = [];
  for (const el of $('script[type="application/ld+json"]')) {
    const txt = $(el).text().trim();
    try { out.push(JSON.parse(txt)); } catch {}
  }
  return out;
}

function extractFromHTML(htmlPath) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const $ = cheerio.load(html, { decodeEntities: true });

  const slug = path.basename(htmlPath, '.html');

  const articleLD = findJsonLD($, 'Article');
  const faqLD = findJsonLD($, 'FAQPage');
  const extras = findAllJsonLD($).filter(o => {
    const t = o['@type'];
    return t && t !== 'Article' && t !== 'BreadcrumbList' && t !== 'FAQPage'
      && t !== 'Organization';   // footer Organization is global, skip
  });

  const titleTag = $('title').text().replace(/\s*—\s*amator\.tr\s*$/, '').trim();
  const h1 = $('article.prose header h1').first().text().trim() || titleTag;

  const description = $('meta[name="description"]').attr('content') || '';
  const keywordsRaw = $('meta[name="keywords"]').attr('content') || '';
  const keywords = keywordsRaw.split(',').map(s => s.trim()).filter(Boolean);

  const pubISO = $('meta[property="article:published_time"]').attr('content') || '';
  const updISO = $('meta[property="article:modified_time"]').attr('content') || '';

  const fm = {
    title: h1,
    description,
    keywords,
    article_section: articleLD?.articleSection || keywords[0] || '',
    published_at: pubISO ? pubISO.slice(0, 10) : '',
    updated_at: updISO ? updISO.slice(0, 10) : '',
  };

  if (faqLD?.mainEntity?.length) {
    fm.faq = faqLD.mainEntity.map(item => ({
      q: item.name,
      a: item.acceptedAnswer?.text || '',
    }));
  }

  if (extras.length) {
    fm.extra_json_ld = extras;
  }

  // Body: clone <article class="prose">, strip header/breadcrumb/anchor-links.
  const $article = $('article.prose').first().clone();
  $article.find('nav.breadcrumb').remove();
  $article.find('header').remove();
  $article.find('a.anchor-link').remove();

  // Strip the per-heading id="..." attribute — build will re-emit them, and
  // leaving them in the MD source would just produce drift.
  $article.find('h1, h2, h3, h4, h5, h6').each((_, el) => {
    $(el).removeAttr('id');
  });

  const bodyHTML = $article.html() || '';
  const td = makeTurndown();
  let bodyMD = td.turndown(bodyHTML).trim() + '\n';

  return { slug, fm, bodyMD };
}

function main() {
  const files = fs.readdirSync(PUBLIC_TUTORIALS)
    .filter(f => f.endsWith('.html') && f !== 'index.html');

  console.log(`Extracting ${files.length} tutorials -> content/tutorials/`);

  let written = 0, errors = 0;
  for (const f of files) {
    try {
      const { slug, fm, bodyMD } = extractFromHTML(path.join(PUBLIC_TUTORIALS, f));
      const out = matter.stringify(bodyMD, fm, {
        // gray-matter's stringify uses YAML; default works.
      });
      fs.writeFileSync(path.join(CONTENT_DIR, `${slug}.md`), out);
      written++;
    } catch (e) {
      errors++;
      console.error(`ERROR ${f}: ${e.message}`);
    }
  }

  console.log(`\nDone: ${written} written, ${errors} errors.`);
}

main();
