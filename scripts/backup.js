import { copyFileSync, readdirSync, unlinkSync, readFileSync, writeFileSync } from 'fs';
import { resolve, join } from 'path';
import { createCipheriv, randomBytes, scryptSync } from 'crypto';

const DATA_DIR = resolve(import.meta.dirname, '../data');
const DB_FILE = join(DATA_DIR, 'cagri.db');
const MAX_BACKUPS = 30;
const PASSPHRASE = process.env.BACKUP_PASSPHRASE;

const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);

try {
  if (PASSPHRASE) {
    // AES-256-GCM ile sifreli yedek. Format:
    //   "AMTRBKv1" magic | salt(16) | iv(12) | tag(16) | ciphertext
    // Salt scrypt key derivation icin; her backup'ta yeni.
    const dest = join(DATA_DIR, `backup-${ts}.db.enc`);
    const plaintext = readFileSync(DB_FILE);
    const salt = randomBytes(16);
    const iv = randomBytes(12);
    // scrypt: N=2^14, r=8, p=1 (~16 MB) — Node default maxmem=32MB sinirinda
    // kalmak icin; offline brute-force icin yeterli rezistans saglar.
    const key = scryptSync(PASSPHRASE, salt, 32, { N: 1 << 14, r: 8, p: 1 });
    const cipher = createCipheriv('aes-256-gcm', key, iv);
    const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
    const tag = cipher.getAuthTag();
    const out = Buffer.concat([Buffer.from('AMTRBKv1', 'ascii'), salt, iv, tag, ciphertext]);
    writeFileSync(dest, out);
    console.log(`Encrypted backup created: ${dest} (${out.length} bytes)`);
  } else {
    const dest = join(DATA_DIR, `backup-${ts}.db`);
    copyFileSync(DB_FILE, dest);
    console.log(`Backup created (PLAINTEXT — set BACKUP_PASSPHRASE for encryption): ${dest}`);
  }
} catch (err) {
  console.error('Backup failed:', err.message);
  process.exit(1);
}

// Hem .db hem .db.enc dosyalarini ayni rotasyon listesinde tut.
const backups = readdirSync(DATA_DIR)
  .filter(f => f.startsWith('backup-') && (f.endsWith('.db') || f.endsWith('.db.enc')))
  .sort()
  .reverse();

for (const old of backups.slice(MAX_BACKUPS)) {
  unlinkSync(join(DATA_DIR, old));
  console.log(`Removed old backup: ${old}`);
}
