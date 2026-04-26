-- schema-v7.sql: morse_sessions mod constraint guncelle (kelime modu ekle)
-- SQLite'da CHECK constraint degistirilemez, tabloyu yeniden olusturmak gerek
CREATE TABLE IF NOT EXISTS morse_sessions_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  mod TEXT DEFAULT 'egitim' CHECK(mod IN ('egitim','canli','cevirici','kelime')),
  hiz INTEGER DEFAULT 15,
  puan INTEGER DEFAULT 0,
  dogru INTEGER DEFAULT 0,
  yanlis INTEGER DEFAULT 0,
  sure INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

INSERT INTO morse_sessions_new (id, user_id, mod, hiz, puan, dogru, yanlis, sure, created_at)
  SELECT id, user_id, mod, hiz, puan, dogru, yanlis, sure, created_at FROM morse_sessions;

DROP TABLE morse_sessions;
ALTER TABLE morse_sessions_new RENAME TO morse_sessions;

CREATE UNIQUE INDEX IF NOT EXISTS idx_morse_sessions_unique ON morse_sessions(user_id, mod);
CREATE INDEX IF NOT EXISTS idx_morse_user ON morse_sessions(user_id, created_at DESC);
