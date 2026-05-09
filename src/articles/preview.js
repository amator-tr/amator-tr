// Markdown preview: dosya yazmaz, build.mjs cagirmaz. Build pipeline'inin
// renderBody fonksiyonunu reuse eder ve cikti uzerinde sanitize-html
// allowlist'i defense-in-depth olarak uygular.

import { renderBody, wordCount, readingTime } from '../../scripts/lib/render.mjs';
import sanitizeHtml from 'sanitize-html';

const ALLOWED_TAGS = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'br', 'hr',
  'ul', 'ol', 'li',
  'strong', 'em', 'code', 'pre', 'blockquote',
  'a', 'img',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'span', 'div', 'time', 'sup', 'sub',
];

const ALLOWED_ATTRS = {
  a: ['href', 'title', 'rel', 'aria-label'],
  img: ['src', 'alt', 'loading'],
  time: ['datetime'],
  '*': ['id', 'class'],
};

export function sanitize(html) {
  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRS,
    allowedSchemes: ['http', 'https', 'mailto'],
    // data: URI img'den kaldirildi: data:image/svg+xml,<svg onload=...>
    // sanitize-html'de scheme bazinda izin verilirken mediatype kontrol
    // edilmez, dolayisiyla SVG (JS yurutebilen) gectiginde XSS olur.
    // Mevcut content/'te base64 image kullanimi yok; ileride ihtiyac
    // olursa specific mediatype regex ile re-enable edilebilir.
    allowedSchemesByTag: { img: ['http', 'https'] },
    disallowedTagsMode: 'discard',
    enforceHtmlBoundary: true,
  });
}

export function renderPreview({ body }) {
  const rawHtml = renderBody(body || '');
  const html = sanitize(rawHtml);
  const wc = wordCount(body || '');
  const rt = readingTime(wc);
  return { html, wordCount: wc, readMinutes: rt };
}
