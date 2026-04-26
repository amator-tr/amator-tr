-- schema-v4.sql: QSO Log, Mors Sistemi, Frekans Rehberi

-- QSO Log tablosu
CREATE TABLE IF NOT EXISTS qso_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  operator_id INTEGER,
  cagri_isareti TEXT NOT NULL,
  tarih TEXT NOT NULL,
  saat TEXT NOT NULL,
  frekans REAL,
  mod TEXT DEFAULT '' CHECK(mod IN ('SSB','FM','CW','AM','DIGI','FT8','FT4','DMR','C4FM','DSTAR','')),
  bant TEXT DEFAULT '',
  rst_gonderilen TEXT DEFAULT '59',
  rst_alinan TEXT DEFAULT '59',
  guc REAL,
  notlar TEXT DEFAULT '',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_qso_user ON qso_log(user_id, tarih DESC);
CREATE INDEX IF NOT EXISTS idx_qso_callsign ON qso_log(user_id, cagri_isareti);
CREATE INDEX IF NOT EXISTS idx_qso_band ON qso_log(user_id, bant);

-- Mors ilerleme tablosu
CREATE TABLE IF NOT EXISTS morse_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  karakter TEXT NOT NULL,
  dogru INTEGER DEFAULT 0,
  yanlis INTEGER DEFAULT 0,
  son_hiz INTEGER DEFAULT 15,
  updated_at TEXT DEFAULT (datetime('now')),
  UNIQUE(user_id, karakter)
);

-- Mors oturum tablosu
CREATE TABLE IF NOT EXISTS morse_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  mod TEXT DEFAULT 'egitim' CHECK(mod IN ('egitim','canli','cevirici')),
  hiz INTEGER DEFAULT 15,
  puan INTEGER DEFAULT 0,
  dogru INTEGER DEFAULT 0,
  yanlis INTEGER DEFAULT 0,
  sure INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_morse_user ON morse_sessions(user_id, created_at DESC);

-- Frekans rehberi tablosu
CREATE TABLE IF NOT EXISTS frekans_rehberi (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  bant TEXT NOT NULL,
  baslangic REAL NOT NULL,
  bitis REAL NOT NULL,
  mod TEXT DEFAULT '',
  aciklama TEXT DEFAULT '',
  tur TEXT DEFAULT 'bant' CHECK(tur IN ('bant','role','tekrarla')),
  bolge TEXT DEFAULT 'TR'
);

-- Turk amator telsiz band plani seed data
INSERT OR IGNORE INTO frekans_rehberi (bant, baslangic, bitis, mod, aciklama, tur) VALUES
  ('160m', 1.810, 1.850, 'CW/SSB', 'HF - Gece yayilimi', 'bant'),
  ('80m', 3.500, 3.800, 'CW/SSB', 'HF - Bolgesel iletisim', 'bant'),
  ('40m', 7.000, 7.200, 'CW/SSB', 'HF - En populer bant', 'bant'),
  ('30m', 10.100, 10.150, 'CW/DIGI', 'HF - Dar bant, dijital modlar', 'bant'),
  ('20m', 14.000, 14.350, 'CW/SSB', 'HF - DX (uzak mesafe) bantı', 'bant'),
  ('17m', 18.068, 18.168, 'CW/SSB', 'HF - WARC bant', 'bant'),
  ('15m', 21.000, 21.450, 'CW/SSB', 'HF - Gunduz yayilimi', 'bant'),
  ('12m', 24.890, 24.990, 'CW/SSB', 'HF - WARC bant', 'bant'),
  ('10m', 28.000, 29.700, 'CW/SSB/FM', 'HF - Gunes lekesi donemlerinde aktif', 'bant'),
  ('6m', 50.000, 54.000, 'CW/SSB/FM', 'VHF - Magic bant, sporadik yayilim', 'bant'),
  ('2m', 144.000, 146.000, 'FM/SSB/CW', 'VHF - En yaygin VHF bant', 'bant'),
  ('70cm', 430.000, 440.000, 'FM/SSB/DIGI', 'UHF - Sehir ici iletisim', 'bant'),
  ('23cm', 1240.000, 1300.000, 'FM/DIGI', 'UHF - Mikrodalga iletisim', 'bant');

-- Istanbul röleler
INSERT OR IGNORE INTO frekans_rehberi (bant, baslangic, bitis, mod, aciklama, tur) VALUES
  ('2m', 145.600, 145.600, 'FM', 'Istanbul Camlica Rolesi - TA1ACR', 'role'),
  ('2m', 145.625, 145.625, 'FM', 'Istanbul Beylikduzu Rolesi', 'role'),
  ('2m', 145.650, 145.650, 'FM', 'Istanbul Kartal Rolesi', 'role'),
  ('2m', 145.700, 145.700, 'FM', 'Istanbul Genel Cagri', 'role'),
  ('70cm', 438.650, 438.650, 'FM', 'Istanbul UHF Rolesi', 'role'),
  ('70cm', 438.800, 438.800, 'DMR', 'Istanbul DMR Rolesi', 'role');
