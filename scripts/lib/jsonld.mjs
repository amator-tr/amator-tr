// JSON-LD block builders for tutorial pages. JSON.stringify handles all
// Turkish + quote escaping correctly, so we never hand-build JSON strings.

const SITE_URL = 'https://amator.tr';

export function articleLD(meta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.description,
    url: `${SITE_URL}/tutorials/${meta.slug}`,
    datePublished: meta.publishedISO,
    dateModified: meta.updatedISO,
    inLanguage: 'tr-TR',
    author: {
      '@type': 'Person',
      name: meta.authorName,
      url: `${SITE_URL}/iletisim`,
      identifier: meta.authorCallsign,
    },
    publisher: {
      '@type': 'Organization',
      name: 'amator.tr',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/og/default.png` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/tutorials/${meta.slug}`,
    },
    articleSection: meta.articleSection,
    keywords: meta.keywords.join(', '),
    wordCount: meta.wordCount,
    image: `${SITE_URL}/og/${meta.ogImage}`,
  };
}

export function breadcrumbLD(meta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: "Tutorial'lar", item: `${SITE_URL}/tutorials/` },
      { '@type': 'ListItem', position: 3, name: meta.title },
    ],
  };
}

export function faqLD(faqItems) {
  if (!faqItems || faqItems.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function collectionPageLD({ name, url, description, count }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    url,
    inLanguage: 'tr-TR',
    description,
    isPartOf: { '@type': 'WebSite', name: 'amator.tr', url: `${SITE_URL}/` },
    numberOfItems: count,
  };
}

export function tagCollectionLD({ tag, url, articles }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `"${tag}" etiketli tutorial'lar`,
    url,
    inLanguage: 'tr-TR',
    isPartOf: { '@type': 'WebSite', name: 'amator.tr', url: `${SITE_URL}/` },
    hasPart: articles.map(a => ({
      '@type': 'Article',
      headline: a.title,
      url: `${SITE_URL}/tutorials/${a.slug}`,
    })),
  };
}

// Render an array of JSON-LD objects to <script> tags joined by newline.
export function renderLDBlocks(objects) {
  return objects
    .filter(Boolean)
    .map(obj => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`)
    .join('\n');
}
