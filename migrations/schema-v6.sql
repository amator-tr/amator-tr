-- schema-v6.sql: morse_sessions unique constraint (kullanici+mod basina tek kayit)
-- Mevcut verileri temizle, sadece her kullanicinin en yuksek skorunu tut
DELETE FROM morse_sessions WHERE id NOT IN (
  SELECT id FROM (
    SELECT id, ROW_NUMBER() OVER (PARTITION BY user_id, mod ORDER BY puan DESC) as rn
    FROM morse_sessions
  ) WHERE rn = 1
);

-- Unique index ekle
CREATE UNIQUE INDEX IF NOT EXISTS idx_morse_sessions_unique ON morse_sessions(user_id, mod);
