-- schema-v5.sql: Mors kullanilan kelimeler tablosu
CREATE TABLE IF NOT EXISTS morse_used_words (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  kelime TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_morse_used ON morse_used_words(user_id, created_at DESC);
