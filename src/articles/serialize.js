// content/tutorials/<slug>.md round-trip. gray-matter.stringify'i taklit
// ediyoruz cunku frontmatter sirasini deterministik tutmak istiyoruz —
// build cache'i frontmatter JSON.stringify uzerinden hash aliyor (bkz.
// scripts/lib/cache.mjs hashArticle), ekstra/eksik alan farki re-build
// tetikler. Burada ham YAML stringini DB'de saklayip aynen yaziyoruz.

import matter from 'gray-matter';

export function buildMarkdownFile({ frontmatter, body }) {
  return matter.stringify(body || '', frontmatter || {});
}

export function parseMarkdownFile(raw) {
  const parsed = matter(raw);
  return { frontmatter: parsed.data || {}, body: parsed.content || '' };
}

// Sadece frontmatter YAML'inin govdesini (--- blogu olmadan) doner.
// articles.frontmatter_yaml kolonunda saklanir.
export function frontmatterYaml(frontmatter) {
  const full = matter.stringify('', frontmatter || {});
  return full.replace(/^---\n/, '').replace(/\n---\n?$/, '').trim();
}
