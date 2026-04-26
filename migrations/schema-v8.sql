-- schema-v8.sql: morse_sessions mod constraint guncelle (hiz + hayatta_kal ekle)
CREATE TABLE IF NOT EXISTS morse_sessions_new2 (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  mod TEXT DEFAULT 'egitim' CHECK(mod IN ('egitim','canli','cevirici','kelime','hiz','hayatta_kal')),
  hiz INTEGER DEFAULT 15,
  puan INTEGER DEFAULT 0,
  dogru INTEGER DEFAULT 0,
  yanlis INTEGER DEFAULT 0,
  sure INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

INSERT INTO morse_sessions_new2 (id, user_id, mod, hiz, puan, dogru, yanlis, sure, created_at)
  SELECT id, user_id, mod, hiz, puan, dogru, yanlis, sure, created_at FROM morse_sessions;

DROP TABLE morse_sessions;
ALTER TABLE morse_sessions_new2 RENAME TO morse_sessions;

CREATE UNIQUE INDEX IF NOT EXISTS idx_morse_sessions_unique ON morse_sessions(user_id, mod);
CREATE INDEX IF NOT EXISTS idx_morse_user ON morse_sessions(user_id, created_at DESC);
