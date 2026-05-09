// Dosya yukleme: ext + magic-byte allowlist + kategori esleme + sanitize.
//
// Guvenlik felsefesi: ALLOWLIST. Her kayit (ext, magic-byte MIME)
// ciftiyle eslesmek zorunda — uzanti spoof + magic spoof birlikte ancak
// gercekten bu listede olan tipler kabul edilir. SVG/HTML/JS/PHP/sh
// listede YOKTUR (defense-in-depth: nginx katmaninda da 403).

// Her ext icin: kategori klasoru + kabul edilen MIME(ler) (file-type'in
// fileTypeFromBuffer ciktisi). MIME yoksa magic-byte cikmiyor demektir;
// txt/csv gibi text dosyalar magic'siz — mime: null kabul edilir.
const ALLOW = {
  // Resim
  'png':  { category: 'img',   mime: ['image/png'] },
  'jpg':  { category: 'img',   mime: ['image/jpeg'] },
  'jpeg': { category: 'img',   mime: ['image/jpeg'] },
  'webp': { category: 'img',   mime: ['image/webp'] },
  'gif':  { category: 'img',   mime: ['image/gif'] },

  // Dokuman
  'pdf':  { category: 'pdf',   mime: ['application/pdf'] },
  'txt':  { category: 'doc',   mime: null }, // text dosya magic yok
  'csv':  { category: 'doc',   mime: null },
  'doc':  { category: 'doc',   mime: ['application/msword', 'application/x-cfb'] },
  'docx': { category: 'doc',   mime: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip'] },
  'xls':  { category: 'doc',   mime: ['application/vnd.ms-excel', 'application/x-cfb'] },
  'xlsx': { category: 'doc',   mime: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/zip'] },

  // Ses
  'mp3':  { category: 'audio', mime: ['audio/mpeg'] },
  'wav':  { category: 'audio', mime: ['audio/wav', 'audio/x-wav'] },
  'ogg':  { category: 'audio', mime: ['audio/ogg'] },
  'm4a':  { category: 'audio', mime: ['audio/mp4', 'audio/x-m4a'] },

  // Video
  'mp4':  { category: 'video', mime: ['video/mp4'] },
  'webm': { category: 'video', mime: ['video/webm'] },
  'mov':  { category: 'video', mime: ['video/quicktime'] },
  'mkv':  { category: 'video', mime: ['video/x-matroska'] },

  // Arsiv
  'zip':  { category: 'arsiv', mime: ['application/zip'] },
  'tar':  { category: 'arsiv', mime: ['application/x-tar'] },
  'gz':   { category: 'arsiv', mime: ['application/gzip'] },
  '7z':   { category: 'arsiv', mime: ['application/x-7z-compressed'] },
  'rar':  { category: 'arsiv', mime: ['application/x-rar-compressed', 'application/vnd.rar'] },

  // Calistirilabilir / paket (Content-Disposition: attachment zorunlu)
  'exe':  { category: 'exe',   mime: ['application/x-msdownload', 'application/vnd.microsoft.portable-executable', 'application/x-dosexec'] },
  'msi':  { category: 'exe',   mime: ['application/x-msi', 'application/x-cfb'] },
  'dmg':  { category: 'exe',   mime: ['application/x-apple-diskimage'] },
  'deb':  { category: 'exe',   mime: ['application/vnd.debian.binary-package', 'application/x-deb'] },
  'rpm':  { category: 'exe',   mime: ['application/x-rpm'] },
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
// detected null ise (file-type taniyamadi): sadece null-mime allowlist
// kabul (txt, csv).
export function magicMatchesExt(ext, detected) {
  const allow = ALLOW[ext];
  if (!allow) return false;
  if (allow.mime === null) {
    // Magic yok kabul: detected null veya text-based
    return detected === null || detected === undefined;
  }
  if (!detected || !detected.mime) return false;
  return allow.mime.includes(detected.mime);
}

// Filename sanitize: NFKC normalize + ASCII-only ([a-zA-Z0-9._-]) + max len.
// ../ trick'leri ve unicode homoglyphs elenir.
export function sanitizeFilename(original) {
  if (typeof original !== 'string') return 'file';
  let s = original.normalize('NFKC');
  // Sadece basename
  const slash = Math.max(s.lastIndexOf('/'), s.lastIndexOf('\\'));
  if (slash >= 0) s = s.slice(slash + 1);
  // Tehlikeli karakterleri _ ile degistir
  s = s.replace(/[^a-zA-Z0-9._-]/g, '_');
  // Bas/son tireleri/noktalari at
  s = s.replace(/^[._-]+|[._-]+$/g, '');
  // Cift uzanti normalize: arada nokta varsa son uzantiyi koru, kalanlari _ yap
  // (basit: nokta sayisini 1'e indir — son uzanti haric)
  const lastDot = s.lastIndexOf('.');
  if (lastDot > 0) {
    const base = s.slice(0, lastDot).replace(/\./g, '_');
    const ext = s.slice(lastDot);
    s = base + ext;
  }
  if (!s) s = 'file';
  if (s.length > MAX_FILENAME_LEN) {
    const lastDot2 = s.lastIndexOf('.');
    if (lastDot2 > 0) {
      const ext = s.slice(lastDot2);
      const base = s.slice(0, lastDot2);
      const room = MAX_FILENAME_LEN - ext.length;
      s = base.slice(0, Math.max(1, room)) + ext;
    } else {
      s = s.slice(0, MAX_FILENAME_LEN);
    }
  }
  return s;
}

export const CATEGORIES = ['img', 'pdf', 'video', 'audio', 'arsiv', 'exe', 'doc', 'diger'];
