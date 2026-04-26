-- v10: 6-haneli doğrulama kodu (link alternatif)
-- Kullanıcı email'deki linki tıklayabilir VEYA 6-haneli kodu /verify-resend
-- sayfasında manuel girebilir. İki yöntem de aynı verification_token /
-- verification_code'u tüketir.

ALTER TABLE users ADD COLUMN verification_code TEXT;

CREATE INDEX IF NOT EXISTS idx_users_verification_code ON users(verification_code) WHERE verification_code IS NOT NULL;
