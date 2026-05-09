// Heading -> id slug. Replicates the rules baked into existing tutorial HTML
// so anchor IDs remain stable across the MD -> HTML migration.
//
// Empirically derived from existing files:
//   "Adım 4: Röle CSV'sini hazırla" -> "adim-4-role-csv-39-sini-hazirla"
//   "Baofeng UV-5R neden hâlâ popüler?" -> "baofeng-uv-5r-neden-h-l-populer"
//   "İlgili kaynaklar" -> "i-lgili-kaynaklar"
//   "\"Fısıltı\" nasıl duyuluyor?" -> "fisilti-nasil-duyuluyor"
//
// Pipeline:
//   1. HTML-encode bare apostrophes ("\'" -> "&#39;"). Double quotes are
//      NOT encoded — they get stripped like any other punctuation.
//   2. Default toLowerCase. Crucially, "İ" becomes "i̇" (i + combining
//      dot above) which step 4 turns into "i-". Same for any other char that
//      decomposes into a base letter plus combining marks.
//   3. Apply Turkish lowercase charmap (only the 6 lowercase Turkish letters
//      map to ASCII; uppercase variants were already lowercased in step 2).
//   4. Replace any run of non-[a-z0-9] with "-".
//   5. Trim leading/trailing "-".

const TURKISH_LOWER_MAP = {
  'ı': 'i',
  'ş': 's',
  'ğ': 'g',
  'ü': 'u',
  'ö': 'o',
  'ç': 'c',
};

export function slugifyHeading(text) {
  let s = String(text);
  // The "&" char is stripped (not turned into "-") by the source generator,
  // so "S&P" -> "sp" rather than "s-p". Apply this before encoding
  // apostrophes so "&#39;" itself is not damaged.
  s = s.replace(/'/g, '\x00ENC_APOS\x00');
  s = s.replace(/&/g, '');
  s = s.replace(/\x00ENC_APOS\x00/g, '&#39;');
  s = s.toLowerCase();
  s = s.replace(/[ışğüöç]/g, ch => TURKISH_LOWER_MAP[ch] || ch);
  s = s.replace(/[^a-z0-9]+/g, '-');
  s = s.replace(/^-+|-+$/g, '');
  return s;
}

// Slug for filenames / tag dirs. Uses Turkish-locale lowercase so "İ" -> "i"
// (no combining dot). This matches existing filename slugs like
// `cagri-isareti-nasil-alinir` (from "Çağrı İşareti...").
export function slugifyFilename(text) {
  let s = String(text);
  s = s.toLocaleLowerCase('tr');
  s = s.replace(/[ışğüöç]/g, ch => TURKISH_LOWER_MAP[ch] || ch);
  s = s.replace(/[^a-z0-9]+/g, '-');
  s = s.replace(/^-+|-+$/g, '');
  return s;
}

// Search-normalized text used in tutorials/index.html data-search attributes.
// Default (non-locale) lowercase to match the canonical generator: this
// produces "i̇" (i + combining dot) for "İ", which the canonical strings
// already contain. Then fold the 6 Turkish lowercase letters to ASCII.
export function searchNormalize(text) {
  let s = String(text);
  s = s.toLowerCase();
  s = s.replace(/[ışğüöç]/g, ch => TURKISH_LOWER_MAP[ch] || ch);
  return s;
}
