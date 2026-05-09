-- Articles: admin tarafindan yayinlanacak Markdown kaynakli makalelerin
-- DB tarafi metadata + draft/version ayagi. Yayinlanan icerik gercek
-- kaynagi olarak content/tutorials/<slug>.md dosyasidir. Bu tablo
-- taslak, audit, ve rollback snapshot icin tutulur.
CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  keywords TEXT NOT NULL DEFAULT '',
  article_section TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL CHECK (status IN ('draft','published','archived')) DEFAULT 'draft',
  markdown_source TEXT NOT NULL DEFAULT '',
  frontmatter_yaml TEXT NOT NULL DEFAULT '',
  published_at TEXT,
  updated_at TEXT,
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at);

CREATE TABLE IF NOT EXISTS article_versions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  article_id INTEGER NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  markdown_source TEXT NOT NULL,
  frontmatter_yaml TEXT NOT NULL,
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_article_versions_article ON article_versions(article_id);
