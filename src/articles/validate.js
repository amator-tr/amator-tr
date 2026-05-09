// Frontmatter + slug dogrulama. Publish ve preview'da ayni kurallarin
// kullanilmasini saglamak icin tek dosyada toplandi.

const SLUG_RE = /^[a-z0-9-]+$/;

export function validateSlug(slug) {
  if (typeof slug !== 'string' || !slug) return 'Slug bos';
  if (slug.length > 80) return 'Slug 80 karakteri asamaz';
  if (!SLUG_RE.test(slug)) return 'Slug sadece a-z 0-9 ve tire icerebilir';
  if (slug.startsWith('-') || slug.endsWith('-')) return 'Slug tire ile baslayamaz/bitemez';
  return null;
}

export function validateFrontmatter(fm) {
  const errors = [];
  if (!fm) return ['Frontmatter bos'];

  if (!fm.title || typeof fm.title !== 'string' || !fm.title.trim()) errors.push('title gerekli');
  else if (fm.title.length > 200) errors.push('title 200 karakteri asamaz');

  if (!fm.description || typeof fm.description !== 'string' || !fm.description.trim()) errors.push('description gerekli');
  else if (fm.description.length > 300) errors.push('description 300 karakteri asamaz');

  if (!Array.isArray(fm.keywords) || fm.keywords.length === 0) errors.push('keywords (en az 1) gerekli');
  else if (fm.keywords.some(k => typeof k !== 'string' || !k.trim())) errors.push('keywords tum elemanlar string olmali');

  if (!fm.article_section || typeof fm.article_section !== 'string') errors.push('article_section gerekli');

  const dateRe = /^\d{4}-\d{2}-\d{2}$/;
  const published = fm.published_at instanceof Date
    ? fm.published_at.toISOString().slice(0, 10)
    : String(fm.published_at || '');
  if (!dateRe.test(published)) errors.push('published_at YYYY-MM-DD formatinda gerekli');

  if (fm.faq !== undefined) {
    if (!Array.isArray(fm.faq)) errors.push('faq dizi olmali');
    else for (const [i, item] of fm.faq.entries()) {
      if (!item || typeof item !== 'object') { errors.push(`faq[${i}] obje olmali`); continue; }
      if (!item.q || typeof item.q !== 'string') errors.push(`faq[${i}].q gerekli`);
      if (!item.a || typeof item.a !== 'string') errors.push(`faq[${i}].a gerekli`);
    }
  }

  return errors;
}
