// Dosya yukleme: ext + magic-byte allowlist + kategori esleme + sanitize.
//
// Guvenlik felsefesi: ALLOWLIST. Her kayit (ext, magic-byte MIME)
// ciftiyle eslesmek zorunda — uzanti spoof + magic spoof birlikte ancak
// gercekten bu listede olan tipler kabul edilir. SVG/HTML/JS/PHP/sh
// listede YOKTUR (defense-in-depth: nginx katmaninda da 403).

// Her ext icin: kategori klasoru + kabul edilen MIME(ler) (file-type'in
// fileTypeFromBuffer ciktisi).
// - mime: [] dizisi -> file-type'in donmesi gereken kabul edilebilir
//   MIME'lar
// - mime: null -> magic-byte yok (text dosyalar)
// - lenient: true -> file-type null donerse veya beklenmedik bir
//   "compressed/inner format" donerse de kabul. DMG/MSI/DEB/RPM gibi
//   container formatlar icin. file-type bu formatlari her zaman tanimaz —
//   image/audio gibi siki kontrol etmek anlamsiz, false-rejection yaratir.
const ALLOW = {
  // Resim — siki magic kontrol (XSS riski en yuksek bu kategoride)
  'png':  { category: 'img',   mime: ['image/png'] },
  'jpg':  { category: 'img',   mime: ['image/jpeg'] },
  'jpeg': { category: 'img',   mime: ['image/jpeg'] },
  'webp': { category: 'img',   mime: ['image/webp'] },
  'gif':  { category: 'img',   mime: ['image/gif'] },

  // Dokuman
  'pdf':  { category: 'pdf',   mime: ['application/pdf'] },
  'txt':  { category: 'doc',   mime: null }, // text — file-type null
  'csv':  { category: 'doc',   mime: null },
  'doc':  { category: 'doc',   mime: ['application/msword', 'application/x-cfb'], lenient: true },
  'docx': { category: 'doc',   mime: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip'] },
  'xls':  { category: 'doc',   mime: ['application/vnd.ms-excel', 'application/x-cfb'], lenient: true },
  'xlsx': { category: 'doc',   mime: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/zip'] },

  // Ses — siki magic
  'mp3':  { category: 'audio', mime: ['audio/mpeg'] },
  'wav':  { category: 'audio', mime: ['audio/wav', 'audio/x-wav'] },
  'ogg':  { category: 'audio', mime: ['audio/ogg'] },
  'm4a':  { category: 'audio', mime: ['audio/mp4', 'audio/x-m4a'] },

  // Video — siki magic
  'mp4':  { category: 'video', mime: ['video/mp4'] },
  'webm': { category: 'video', mime: ['video/webm'] },
  'mov':  { category: 'video', mime: ['video/quicktime'] },
  'mkv':  { category: 'video', mime: ['video/x-matroska'] },

  // Arsiv
  'zip':  { category: 'arsiv', mime: ['application/zip'] },
  'tar':  { category: 'arsiv', mime: ['application/x-tar'], lenient: true },
  'gz':   { category: 'arsiv', mime: ['application/gzip'] },
  '7z':   { category: 'arsiv', mime: ['application/x-7z-compressed'] },
  'rar':  { category: 'arsiv', mime: ['application/x-rar-compressed', 'application/vnd.rar'] },

  // Calistirilabilir / paket (Content-Disposition: attachment zorunlu)
  // DMG/MSI/DEB/RPM container formatlar — file-type bunlari guvenilir
  // tanimaz (DMG koly trailer dosyanin SONUNDA, MSI compound file binary
  // sahteciligi yaygin, DEB ar arsivi, RPM custom). lenient: true.
  'exe':  { category: 'exe',   mime: ['application/x-msdownload', 'application/vnd.microsoft.portable-executable', 'application/x-dosexec'] },
  'msi':  { category: 'exe',   mime: ['application/x-msi', 'application/x-cfb'], lenient: true },
  'dmg':  { category: 'exe',   mime: ['application/x-apple-diskimage', 'application/x-bzip2', 'application/zlib', 'application/zip'], lenient: true },
  'deb':  { category: 'exe',   mime: ['application/vnd.debian.binary-package', 'application/x-deb'], lenient: true },
  'rpm':  { category: 'exe',   mime: ['application/x-rpm'], lenient: true },
};

const MAX_FILENAME_LEN = 80;

export function getExt(name) {
  if (typeof name !== 'string') return '';
  const i = name.lastIndexOf('.');
  if (i < 0 || i === name.length - 1) return '';
  return name.slice(i + 1).toLowerCase();
}

export function isAllowed(ext) {
  return Object.prototype.hasOwnProperty.call(ALLOW, ext);
}

export function categoryFor(ext) {
  return ALLOW[ext]?.category || 'diger';
}

// magic-byte sonucu (file-type'in donus objesi: { ext, mime }) ile
// kullanicinin verdigi extension uyumlu mu?
//
// Mantik:
// - mime===null (text dosyalar): detected null bekleniyor, baska sey
//   gelirse "spoof" reddedilir
// - lenient===true (DMG/MSI/DEB/RPM gibi container'lar): detected null
//   veya allow.mime listesinde olan herhangi bir MIME kabul. file-type
//   bu formatlari guvenilir tanimaz, false-rejection'i onler
// - default (image/audio/video/pdf/zip): detected MUST be in allow.mime
export function magicMatchesExt(ext, detected) {
  const allow = ALLOW[ext];
  if (!allow) return false;

  // Text — magic yok beklenir
  if (allow.mime === null) {
    return !detected || !detected.mime;
  }

  // Container/lenient — null veya allowed MIME
  if (allow.lenient) {
    if (!detected || !detected.mime) return true; // file-type taniyamadi
    return allow.mime.includes(detected.mime);
  }

  // Strict — magic detected ve listede olmali
  if (!detected || !detected.mime) return false;
  return allow.mime.includes(detected.mime);
}

// Lenient filename normalize: orijinal ismi mumkun oldugunca koru.
// Unicode (Turkce karakterler, emoji, CJK), bosluk, parantez, kesme isareti,
// vb. korunur. Sadece path-traversal ve control char tehlikeleri temizlenir.
//
// Kaldirilan karakterler:
//   - / ve \  → basename only (path traversal)
//   - \x00-\x1f, \x7f (control chars + DEL) → strip (terminal/header injection)
//   - .. dizileri → tek nokta (relative path traversal)
//   - bas/son nokta + bosluk → kirpilir (hidden file + Windows quirks)
//
// Korunan karakterler:
//   - a-z A-Z 0-9 (ASCII alfanumeric)
//   - Unicode harfler (Türkçe ç ğ ı ö ş ü, vb.)
//   - bosluk, ( ) [ ] { } & + , ; = ~ ! @ # $ % - _ . '
//   - URL'de browser tarafi auto-encode eder (boslugu %20 gibi)
export function lenientName(original) {
  if (typeof original !== 'string') return 'file';
  let s = original.normalize('NFC');
  // Basename only
  const slash = Math.max(s.lastIndexOf('/'), s.lastIndexOf('\\'));
  if (slash >= 0) s = s.slice(slash + 1);
  // Control chars + DEL elenir
  s = s.replace(/[\x00-\x1f\x7f]/g, '');
  // .. dizileri (relative traversal) -> tek nokta
  s = s.replace(/\.{2,}/g, '.');
  // Bas/son nokta ve bosluk
  s = s.replace(/^[.\s]+|[.\s]+$/g, '');
  if (!s) s = 'file';
  // Filesystem limit (255), URL pratiklik icin 200'de kes — uzantiyi koru
  if (s.length > MAX_FILENAME_LEN) {
    const lastDot = s.lastIndexOf('.');
    if (lastDot > 0 && s.length - lastDot <= 16) {
      const ext = s.slice(lastDot);
      s = s.slice(0, MAX_FILENAME_LEN - ext.length) + ext;
    } else {
      s = s.slice(0, MAX_FILENAME_LEN);
    }
  }
  return s;
}

// Yeni-bir-isim onerisi: 'foo.png' var ise 'foo (2).png' den baslayarak
// disk'te bos isim bulana kadar dener (max 999).
export function suggestUniqueName(name, exists) {
  // exists: (candidate) => boolean (sync fs check disaridan)
  if (!exists(name)) return name;
  const lastDot = name.lastIndexOf('.');
  const base = lastDot > 0 ? name.slice(0, lastDot) : name;
  const ext = lastDot > 0 ? name.slice(lastDot) : '';
  for (let i = 2; i < 1000; i++) {
    const candidate = `${base} (${i})${ext}`;
    if (!exists(candidate)) return candidate;
  }
  return null; // 999 deneme tukendi
}

export const CATEGORIES = ['img', 'pdf', 'video', 'audio', 'arsiv', 'exe', 'doc', 'diger'];
