-- =============================================
-- Schema V2: Multi-tenant kullanici sistemi
-- =============================================

-- Kullanicilar tablosu
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  display_name TEXT DEFAULT '',
  role TEXT NOT NULL DEFAULT 'user' CHECK(role IN ('admin','user')),
  github_id INTEGER UNIQUE,
  avatar_url TEXT DEFAULT '',
  last_login TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Sistem ayarlari
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
INSERT OR IGNORE INTO settings VALUES ('registration_open','true');

-- Giris loglari
CREATE TABLE IF NOT EXISTS login_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT,
  ip TEXT,
  user_agent TEXT DEFAULT '',
  success INTEGER NOT NULL DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Aktivite logu
CREATE TABLE IF NOT EXISTS activity_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  action TEXT NOT NULL,
  detail TEXT DEFAULT '',
  created_at TEXT DEFAULT (datetime('now'))
);

-- operatorler tablosuna user_id ekle (mevcut tablo varsa)
-- D1'de ALTER TABLE ile UNIQUE constraint degistirilemez,
-- bu yuzden yeni tablo olusturup veriyi tasiyoruz.

CREATE TABLE IF NOT EXISTS operatorler_v2 (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  operator TEXT NOT NULL,
  cagri_isareti TEXT NOT NULL,
  qth TEXT DEFAULT '',
  hakkinda TEXT DEFAULT '',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  UNIQUE(user_id, cagri_isareti)
);

-- Mevcut verileri tasi (user_id=1 = kaandikec admin)
INSERT OR IGNORE INTO operatorler_v2 (id, user_id, operator, cagri_isareti, qth, hakkinda, created_at, updated_at)
  SELECT id, 1, operator, cagri_isareti, qth, hakkinda, created_at, updated_at FROM operatorler;

-- Eski tabloyu kaldir, yenisini yeniden adlandir
DROP TABLE IF EXISTS operatorler;
ALTER TABLE operatorler_v2 RENAME TO operatorler;
