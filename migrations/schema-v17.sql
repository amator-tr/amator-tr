-- dosyalar.amator.tr admin upload servisi.
-- data/dosyalar/category/rand-sanitized diskteki yer. Bu tablo meta,
-- listing, delete UI ve sha256-dedup icin tutulur.

CREATE TABLE IF NOT EXISTS uploads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  original_name TEXT NOT NULL,
  stored_path TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  mime TEXT NOT NULL,
  size INTEGER NOT NULL,
  sha256 TEXT NOT NULL,
  uploaded_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  uploaded_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_uploads_category_date ON uploads(category, uploaded_at DESC);
CREATE INDEX IF NOT EXISTS idx_uploads_sha256 ON uploads(sha256);
