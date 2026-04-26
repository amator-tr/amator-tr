-- Schema V3: Announcements + Activity index

-- Duyurular tablosu
CREATE TABLE IF NOT EXISTS announcements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info' CHECK(type IN ('info','warning','success')),
  active INTEGER NOT NULL DEFAULT 1,
  created_by INTEGER NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Activity log index
CREATE INDEX IF NOT EXISTS idx_activity_user ON activity_log(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_date ON activity_log(created_at DESC);
