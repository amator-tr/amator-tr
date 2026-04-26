import { getRawDB } from './db.js';
import { readFileSync, readdirSync } from 'fs';
import { resolve, join } from 'path';

const MIGRATIONS_DIR = resolve(import.meta.dirname, '../migrations');

const db = getRawDB();

db.pragma('journal_mode = WAL');

db.prepare(`CREATE TABLE IF NOT EXISTS _migrations (
  name TEXT PRIMARY KEY,
  applied_at TEXT DEFAULT (datetime('now'))
)`).run();

const applied = new Set(
  db.prepare('SELECT name FROM _migrations').all().map(r => r.name)
);

const files = readdirSync(MIGRATIONS_DIR)
  .filter(f => f.endsWith('.sql'))
  .sort((a, b) => {
    const numA = a.match(/\d+/)?.[0] || '0';
    const numB = b.match(/\d+/)?.[0] || '0';
    return parseInt(numA) - parseInt(numB);
  });

let count = 0;
for (const file of files) {
  if (applied.has(file)) continue;
  const sql = readFileSync(join(MIGRATIONS_DIR, file), 'utf-8');
  console.log(`Applying: ${file}`);
  const statements = sql.split(';').map(s => s.trim()).filter(s => s.length > 0);
  for (const stmt of statements) {
    db.prepare(stmt).run();
  }
  db.prepare('INSERT INTO _migrations (name) VALUES (?)').run(file);
  count++;
}

console.log(count ? `${count} migration(s) applied.` : 'Database is up to date.');
process.exit(0);
