-- Articles tablosuna 'type' kolonu: tutorial (default, mevcut tum kayitlar) +
-- page (admin'den editlenebilir statik sayfalar: hakkinda, iletisim, sozluk).
-- Pages farkli output yoluna build edilir (public/<slug>/index.html) ve
-- daha sade frontmatter kullanir (keywords/article_section opsiyonel).

ALTER TABLE articles ADD COLUMN type TEXT NOT NULL DEFAULT 'tutorial' CHECK (type IN ('tutorial','page'));

CREATE INDEX IF NOT EXISTS idx_articles_type ON articles(type);
