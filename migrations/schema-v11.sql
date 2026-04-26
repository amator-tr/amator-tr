-- v11: PBKDF2 iteration sayısını OWASP 2024 önerisine (600000) çıkarmak için
-- per-user iterations kolonu. Lazy migration: kullanıcı login olduğunda
-- mevcut hash 100000 iter ile doğrulanır, ardından 600000 ile yeniden
-- hashlenir ve kolon güncellenir. NULL → eski 100000 (legacy).

ALTER TABLE users ADD COLUMN password_iterations INTEGER;

-- Mevcut tüm kullanıcılar 100000 iter ile hashlandı (auth.js eski sabiti).
UPDATE users SET password_iterations = 100000 WHERE password_iterations IS NULL;
