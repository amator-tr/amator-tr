#!/usr/bin/env node
// Build pipeline: content/tutorials/*.md -> public/tutorials/<slug>.html plus
// regenerated indexes (hub, tag pages, sitemap, feed, valid-slugs).
//
// Skips per-article HTML re-render when the (frontmatter + body + shellHash)
// SHA-256 matches the cached value. Always re-emits the full set of indexes
// because they're cheap and depend on every article.

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import matter from 'gray-matter';

import { renderBody, wordCount, readingTime } from './lib/render.mjs';
import {
  articleLD, breadcrumbLD, faqLD,
  collectionPageLD, tagCollectionLD, renderLDBlocks,
} from './lib/jsonld.mjs';
import { slugifyFilename, searchNormalize } from './lib/slug.mjs';
import { loadCache, saveCache, hashArticle, shellHash } from './lib/cache.mjs';

// ---------------------------------------------------------------------------
// Paths and constants

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const CONTENT_DIR = path.join(ROOT, 'content/tutorials');
const PUBLIC_TUTORIALS = path.join(ROOT, 'public/tutorials');
const PUBLIC_TAGS = path.join(PUBLIC_TUTORIALS, 'tag');
const TEMPLATES = path.join(ROOT, 'scripts/templates');
const VALID_SLUGS_PATH = path.join(ROOT, 'src/valid-slugs.js');
const SITEMAP_PATH = path.join(ROOT, 'public/sitemap.xml');
const FEED_PATH = path.join(ROOT, 'public/feed.xml');
const HUB_PATH = path.join(PUBLIC_TUTORIALS, 'index.html');
const PUBLIC_INCLUDES = path.join(ROOT, 'public/_includes');
const FOOTER_INCLUDE_PATH = path.join(PUBLIC_INCLUDES, 'footer.html');

const SITE_URL = 'https://amator.tr';
const AUTHOR_NAME = 'Kaan Dikeç';
const AUTHOR_CALLSIGN = 'TB2KKD';
const AUTHOR_FULL = `${AUTHOR_NAME} (${AUTHOR_CALLSIGN})`;

const FORCE = process.argv.includes('--force');
const PRUNE_TAGS = process.argv.includes('--prune-tags');

// ---------------------------------------------------------------------------
// Helpers

function escAttr(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
const escText = escAttr; // same rules

function fillTemplate(template, vars) {
  let out = template;
  for (const [k, v] of Object.entries(vars)) {
    out = out.split(`{{${k}}}`).join(v);
  }
  return out;
}

// Normalize a YAML date value (could be string or Date) to ISO components.
function normalizeDates(meta) {
  const pub = toDate(meta.published_at);
  const upd = meta.updated_at ? toDate(meta.updated_at) : pub;
  return {
    publishedDate: pub.toISOString().slice(0, 10),
    publishedISO: `${pub.toISOString().slice(0, 10)}T00:00:00+03:00`,
    updatedDate: upd.toISOString().slice(0, 10),
    updatedISO: `${upd.toISOString().slice(0, 10)}T00:00:00+03:00`,
    pubDate: pub,
  };
}

function toDate(v) {
  if (v instanceof Date) return v;
  // YAML may parse `2026-04-26` as Date already; if string, force UTC midnight.
  return new Date(`${v}T00:00:00Z`);
}

function rfc822Date(d) {
  return d.toUTCString();
}

function readTemplate(name) {
  return fs.readFileSync(path.join(TEMPLATES, name), 'utf8');
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function rmIfExists(p) {
  try { fs.unlinkSync(p); return true; } catch { return false; }
}

function rmDirIfExists(p) {
  try { fs.rmSync(p, { recursive: true, force: true }); return true; } catch { return false; }
}

// ---------------------------------------------------------------------------
// Discovery

function discoverArticles() {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
  return files.map(f => {
    const slug = f.replace(/\.md$/, '');
    const raw = fs.readFileSync(path.join(CONTENT_DIR, f), 'utf8');
    const { data: frontmatter, content: body } = matter(raw);
    return { slug, frontmatter, body };
  });
}

// Order by date DESC, slug ASC within same date — matches the canonical
// prev/next semantics ("Önceki" = older, "Sonraki" = newer).
function feedOrder(articles) {
  return [...articles].sort((a, b) => {
    const da = toDate(a.frontmatter.published_at).getTime();
    const db = toDate(b.frontmatter.published_at).getTime();
    if (db !== da) return db - da;
    return a.slug.localeCompare(b.slug);
  });
}

// ---------------------------------------------------------------------------
// Per-article HTML

function buildArticleHTML({ article, prev, next, shell, prevNextHTML }) {
  const meta = article.frontmatter;
  const slug = article.slug;
  const dates = normalizeDates(meta);
  const wc = wordCount(article.body);
  const rt = readingTime(wc);
  const ogImage = meta.og_image_override || `${slug}.png`;

  const ldObjects = [
    articleLD({
      title: meta.title,
      description: meta.description,
      slug,
      publishedISO: dates.publishedISO,
      updatedISO: dates.updatedISO,
      authorName: AUTHOR_NAME,
      authorCallsign: AUTHOR_CALLSIGN,
      articleSection: meta.article_section,
      keywords: meta.keywords || [],
      wordCount: wc,
      ogImage,
    }),
    breadcrumbLD({ title: meta.title }),
    faqLD(meta.faq),
    ...(meta.extra_json_ld || []),
  ];

  const ld = renderLDBlocks(ldObjects);
  const body = renderBody(article.body);

  return fillTemplate(shell.tutorial, {
    TITLE_ATTR: escAttr(meta.title),
    TITLE_HTML: escText(meta.title),
    DESCRIPTION_ATTR: escAttr(meta.description),
    KEYWORDS_ATTR: escAttr((meta.keywords || []).join(', ')),
    AUTHOR_ATTR: escAttr(AUTHOR_FULL),
    AUTHOR_SHORT_ATTR: escAttr(AUTHOR_NAME),
    SLUG: slug,
    OG_IMAGE: ogImage,
    PUBLISHED_ISO: dates.publishedISO,
    UPDATED_ISO: dates.updatedISO,
    PUBLISHED_DATE: dates.publishedDate,
    READING_TIME: String(rt),
    WORD_COUNT: String(wc),
    STYLES: shell.styles,
    JSON_LD: ld,
    BODY: body,
    PREV_NEXT: prevNextHTML,
    FOOTER: shell.footer,
  });
}

function renderPrevNextHTML(prev, next) {
  const parts = [];
  if (prev) {
    parts.push(
      `<a class="pn-prev" href="/tutorials/${prev.slug}" rel="prev">` +
      `<div class="pn-label">← Önceki</div>` +
      `<div class="pn-title">${escText(prev.frontmatter.title)}</div>` +
      `</a>`
    );
  }
  if (next) {
    parts.push(
      `<a class="pn-next" href="/tutorials/${next.slug}" rel="next">` +
      `<div class="pn-label">Sonraki →</div>` +
      `<div class="pn-title">${escText(next.frontmatter.title)}</div>` +
      `</a>`
    );
  }
  if (parts.length === 0) return '';
  return `<nav class="prev-next" aria-label="Diğer kılavuzlar">${parts.join('')}</nav>`;
}

// ---------------------------------------------------------------------------
// Hub index, tag pages

function articleCardHTML(article) {
  const meta = article.frontmatter;
  const slug = article.slug;
  const dates = normalizeDates(meta);
  const keywords = meta.keywords || [];

  const searchKey = [
    searchNormalize(meta.title),
    searchNormalize(meta.description),
    keywords.map(searchNormalize).join(' '),
    slug,
  ].join(' ');

  const tags = keywords
    .map(k => `<span class="tag">${escText(k)}</span>`)
    .join('');

  return (
`<article class="tutorial-card" data-search="${escAttr(searchKey)}">
  <h2><a href="/tutorials/${slug}">${escText(meta.title)}</a></h2>
  <p class="meta"><time datetime="${dates.publishedDate}">${dates.publishedDate}</time> ${tags}</p>
  <p>${escText(meta.description)}</p>
</article>`
  );
}

function buildHubHTML(articles, shell) {
  // Hub displays articles in feed order (newest first).
  const ordered = feedOrder(articles);
  const cards = ordered.map(articleCardHTML).join('\n');
  const ld = JSON.stringify(collectionPageLD({
    name: "Amatör Telsiz Tutorial'ları",
    url: `${SITE_URL}/tutorials/`,
    description: `Amatör telsiz Türkçe ${articles.length} kapsamlı kılavuz: UV-K5/Baofeng programlama, anten yapımı (J-Pole, EFHW, Yagi), dijital modlar (FT8, APRS, DMR, WinLink), çağrı işareti rehberi, mors kodu, DX hunting, propagasyon. Açık kaynak, ücretsiz.`,
    count: articles.length,
  }));
  return fillTemplate(shell.index, {
    COUNT: String(articles.length),
    STYLES: shell.styles,
    COLLECTION_LD: ld,
    CARDS: cards,
    FOOTER: shell.footer,
  });
}

function buildTagHTML(tag, tagSlug, taggedArticles, shell) {
  const ordered = feedOrder(taggedArticles);
  const cards = ordered.map(articleCardHTML).join('\n');
  const tagDisplay = tag.toLowerCase();
  const ld = JSON.stringify(tagCollectionLD({
    tag: tagDisplay,
    url: `${SITE_URL}/tutorials/tag/${tagSlug}/`,
    articles: ordered.map(a => ({ slug: a.slug, title: a.frontmatter.title })),
  }));
  return fillTemplate(shell.tag, {
    TAG: escText(tagDisplay),
    TAG_SLUG: tagSlug,
    COUNT: String(ordered.length),
    STYLES: shell.styles,
    COLLECTION_LD: ld,
    CARDS: cards,
    FOOTER: shell.footer,
  });
}

// ---------------------------------------------------------------------------
// Sitemap, feed, valid-slugs

function buildSitemap(articles, lastmod, template) {
  const entries = articles
    .slice()
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map(a => {
      const meta = a.frontmatter;
      const og = meta.og_image_override || `${a.slug}.png`;
      const dates = normalizeDates(meta);
      return (
`  <url>
    <loc>${SITE_URL}/tutorials/${a.slug}</loc>
    <lastmod>${dates.updatedDate}</lastmod>
    <priority>0.7</priority>
    <image:image>
      <image:loc>${SITE_URL}/og/${og}</image:loc>
      <image:title>${escText(meta.title)}</image:title>
      <image:caption>${escText(meta.description)}</image:caption>
    </image:image>
  </url>`
      );
    })
    .join('\n');
  return fillTemplate(template, { LASTMOD: lastmod, ENTRIES: entries });
}

function buildFeed(articles, template) {
  const ordered = feedOrder(articles);
  const items = ordered.map(a => {
    const meta = a.frontmatter;
    const dates = normalizeDates(meta);
    return (
`    <item>
      <title>${escText(meta.title)}</title>
      <link>${SITE_URL}/tutorials/${a.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/tutorials/${a.slug}</guid>
      <pubDate>${rfc822Date(dates.pubDate)}</pubDate>
      <description>${escText(meta.description)}</description>
    </item>`
    );
  }).join('\n');
  return fillTemplate(template, { ITEMS: items });
}

function buildValidSlugs(articles) {
  const slugs = articles.map(a => a.slug).sort();
  const lines = slugs.map(s => `  ${JSON.stringify(s)},`).join('\n');
  return (
`// Auto-generated by scripts/build.mjs — do not edit by hand.
// Source: content/tutorials/*.md frontmatter slugs.
export const VALID_TUTORIAL_SLUGS = new Set([
${lines}
]);
`
  );
}

// ---------------------------------------------------------------------------
// Orphan sweep

function listExistingTutorialSlugs() {
  if (!fs.existsSync(PUBLIC_TUTORIALS)) return [];
  return fs.readdirSync(PUBLIC_TUTORIALS)
    .filter(f => f.endsWith('.html') && f !== 'index.html')
    .map(f => f.replace(/\.html$/, ''));
}

function listExistingTagDirs() {
  if (!fs.existsSync(PUBLIC_TAGS)) return [];
  return fs.readdirSync(PUBLIC_TAGS)
    .filter(d => fs.statSync(path.join(PUBLIC_TAGS, d)).isDirectory());
}

// ---------------------------------------------------------------------------
// Main

function main() {
  const articles = discoverArticles();
  console.log(`Found ${articles.length} markdown articles in content/tutorials/`);

  if (articles.length === 0) {
    console.log('No articles. Did you run `npm run extract` first?');
    return;
  }

  // Validate slugs are unique
  const slugSet = new Set();
  for (const a of articles) {
    if (slugSet.has(a.slug)) throw new Error(`Duplicate slug: ${a.slug}`);
    slugSet.add(a.slug);
  }

  // Load shell (templates + styles + footer)
  const shell = {
    tutorial: readTemplate('tutorial.html'),
    index: readTemplate('index.html'),
    tag: readTemplate('tag.html'),
    sitemap: readTemplate('sitemap.xml'),
    feed: readTemplate('feed.xml'),
    styles: readTemplate('styles.css'),
    footer: readTemplate('_footer.html'),
  };

  const sHash = shellHash([
    path.join(TEMPLATES, 'tutorial.html'),
    path.join(TEMPLATES, 'styles.css'),
    path.join(TEMPLATES, '_footer.html'),
  ]);

  const cache = FORCE ? { version: 1, hashes: {} } : loadCache();
  const newHashes = {};

  // Compute prev/next from feed order
  const ordered = feedOrder(articles);
  const idxBySlug = new Map(ordered.map((a, i) => [a.slug, i]));

  let changed = 0, skipped = 0;
  for (const article of articles) {
    const i = idxBySlug.get(article.slug);
    const prev = ordered[i + 1] || null;   // older (next in feed)
    const next = ordered[i - 1] || null;   // newer (prev in feed)
    const prevNextHTML = renderPrevNextHTML(prev, next);

    const hash = hashArticle({
      frontmatter: article.frontmatter,
      body: article.body,
      shellHash: sHash,
    });
    newHashes[article.slug] = hash;

    const outPath = path.join(PUBLIC_TUTORIALS, `${article.slug}.html`);
    if (!FORCE && cache.hashes[article.slug] === hash && fs.existsSync(outPath)) {
      skipped++;
      continue;
    }
    const html = buildArticleHTML({ article, prev, next, shell, prevNextHTML });
    fs.writeFileSync(outPath, html);
    console.log(`[changed] ${article.slug}`);
    changed++;
  }

  // Save cache
  saveCache({ version: 1, hashes: newHashes });

  // Always regenerate indexes
  ensureDir(PUBLIC_TUTORIALS);
  fs.writeFileSync(HUB_PATH, buildHubHTML(articles, shell));
  console.log(`[regen] tutorials/index.html`);

  // Tag pages: collect tag -> articles
  const tagMap = new Map(); // tagSlug -> { display, articles[] }
  for (const a of articles) {
    for (const k of (a.frontmatter.keywords || [])) {
      const tagSlug = slugifyFilename(k);
      if (!tagSlug) continue;
      if (!tagMap.has(tagSlug)) tagMap.set(tagSlug, { display: k, articles: [] });
      tagMap.get(tagSlug).articles.push(a);
    }
  }

  ensureDir(PUBLIC_TAGS);
  for (const [tagSlug, { display, articles: arts }] of tagMap) {
    const dir = path.join(PUBLIC_TAGS, tagSlug);
    ensureDir(dir);
    fs.writeFileSync(path.join(dir, 'index.html'),
      buildTagHTML(display, tagSlug, arts, shell));
  }
  console.log(`[regen] ${tagMap.size} tag pages`);

  // sitemap, feed, valid-slugs
  const todayISO = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(SITEMAP_PATH, buildSitemap(articles, todayISO, shell.sitemap));
  console.log(`[regen] sitemap.xml`);
  fs.writeFileSync(FEED_PATH, buildFeed(articles, shell.feed));
  console.log(`[regen] feed.xml`);
  fs.writeFileSync(VALID_SLUGS_PATH, buildValidSlugs(articles));
  console.log(`[regen] src/valid-slugs.js`);

  // SSI source: statik HTML sayfalari (index.html, hakkinda.html, vs.) bu dosyayi
  // <!--#include virtual="/_includes/footer.html" --> ile cekiyor. Tek kaynak.
  ensureDir(PUBLIC_INCLUDES);
  fs.writeFileSync(FOOTER_INCLUDE_PATH, shell.footer);
  console.log(`[regen] public/_includes/footer.html`);

  // Orphan sweep: HTML files for slugs that no longer have an MD source
  const knownSlugs = new Set(articles.map(a => a.slug));
  for (const existing of listExistingTutorialSlugs()) {
    if (!knownSlugs.has(existing)) {
      rmIfExists(path.join(PUBLIC_TUTORIALS, `${existing}.html`));
      console.log(`[removed] tutorials/${existing}.html (no MD source)`);
    }
  }

  // Tag dirs orphan sweep — gated behind --prune-tags because misconfigured
  // tag changes can wipe valid landing pages otherwise.
  const knownTags = new Set(tagMap.keys());
  for (const existing of listExistingTagDirs()) {
    if (!knownTags.has(existing)) {
      if (PRUNE_TAGS) {
        rmDirIfExists(path.join(PUBLIC_TAGS, existing));
        console.log(`[removed] tag/${existing}/ (orphan)`);
      } else {
        console.log(`[orphan tag] tag/${existing}/ — pass --prune-tags to remove`);
      }
    }
  }

  console.log(`\nDone: ${changed} rebuilt, ${skipped} cached.`);
}

main();
