-- Site stats (KV replacement)
CREATE TABLE IF NOT EXISTS stats_kv (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  expires_at INTEGER
);
CREATE INDEX IF NOT EXISTS idx_stats_kv_expires ON stats_kv(expires_at) WHERE expires_at IS NOT NULL;
