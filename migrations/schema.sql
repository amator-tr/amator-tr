-- Operatorler tablosu (not defteri modeli)
CREATE TABLE IF NOT EXISTS operatorler (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  operator TEXT NOT NULL,
  cagri_isareti TEXT NOT NULL UNIQUE,
  qth TEXT DEFAULT '',
  hakkinda TEXT DEFAULT '',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Icerik moderasyon loglari
CREATE TABLE IF NOT EXISTS moderasyon_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  icerik TEXT NOT NULL,
  sonuc TEXT NOT NULL,
  tarih TEXT DEFAULT (datetime('now'))
);

-- Notlar tablosu
CREATE TABLE IF NOT EXISTS notlar (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  icerik TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);
