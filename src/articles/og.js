// 1200x630 OG karti SVG -> PNG. Pipeline /og/<slug>.png referansi yapar
// ama dosyayi olusturmaz; admin yayini sirasinda burada uretilir.
//
// Font: alpine container'a ttf-dejavu kuruldugu icin loadSystemFonts true.
// Lokal/CI'de DejaVu yoksa resvg sessiz fallback yapabilir; metin gozukmezse
// Dockerfile'da `apk add ttf-dejavu` adimi eksik demektir.

import { Resvg } from '@resvg/resvg-js';

const W = 1200;
const H = 630;
const MAX_LINE_CHARS = 28;
const MAX_TITLE_LINES = 4;

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function wrapTitle(title) {
  const words = String(title).trim().split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    const next = cur ? cur + ' ' + w : w;
    if (next.length > MAX_LINE_CHARS && cur) {
      lines.push(cur);
      cur = w;
      if (lines.length === MAX_TITLE_LINES - 1) break;
    } else {
      cur = next;
    }
  }
  if (cur) lines.push(cur);
  if (lines.length > MAX_TITLE_LINES) lines.length = MAX_TITLE_LINES;
  // Son satira sigmayan kelimeler kalmissa ellipsize.
  const consumed = lines.reduce((n, l) => n + l.split(/\s+/).length, 0);
  if (consumed < words.length) {
    const last = lines[lines.length - 1];
    lines[lines.length - 1] = last.length > 3 ? last.slice(0, last.length - 1) + '…' : last + '…';
  }
  return lines;
}

function buildSvg({ title, slug }) {
  const lines = wrapTitle(title);
  const lineHeight = 70;
  const startY = 220;
  const titleSvg = lines.map((l, i) =>
    `<text x="80" y="${startY + i * lineHeight}" fill="#f5f5f5" font-family="DejaVu Sans, sans-serif" font-size="56" font-weight="700">${escapeXml(l)}</text>`
  ).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0a0a0a"/>
      <stop offset="100%" stop-color="#1c1c1c"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect x="0" y="0" width="8" height="${H}" fill="#e94560"/>
  <text x="80" y="120" fill="#e94560" font-family="DejaVu Sans, sans-serif" font-size="22" font-weight="600" letter-spacing="3">AMATOR.TR · TUTORIAL</text>
  ${titleSvg}
  <text x="80" y="${H - 60}" fill="#888" font-family="DejaVu Sans, sans-serif" font-size="22">amator.tr/tutorials/${escapeXml(slug)}</text>
</svg>`;
}

export function generateOgImagePng({ title, slug }) {
  const svg = buildSvg({ title, slug });
  const resvg = new Resvg(svg, {
    background: 'rgb(10,10,10)',
    fitTo: { mode: 'width', value: W },
    font: { loadSystemFonts: true },
  });
  return resvg.render().asPng();
}
