import { copyFileSync, readdirSync, unlinkSync } from 'fs';
import { resolve, join } from 'path';

const DATA_DIR = resolve(import.meta.dirname, '../data');
const DB_FILE = join(DATA_DIR, 'cagri.db');
const MAX_BACKUPS = 30;

const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const dest = join(DATA_DIR, `backup-${ts}.db`);

try {
  copyFileSync(DB_FILE, dest);
  console.log(`Backup created: ${dest}`);
} catch (err) {
  console.error('Backup failed:', err.message);
  process.exit(1);
}

const backups = readdirSync(DATA_DIR)
  .filter(f => f.startsWith('backup-') && f.endsWith('.db'))
  .sort()
  .reverse();

for (const old of backups.slice(MAX_BACKUPS)) {
  unlinkSync(join(DATA_DIR, old));
  console.log(`Removed old backup: ${old}`);
}
