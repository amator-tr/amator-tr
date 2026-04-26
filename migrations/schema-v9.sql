-- v9: Email verification + Turnstile (CAPTCHA)
-- Mevcut kullanıcılar grandfathered: email_verified=1 (eski hesaplar
-- doğrulamadan girebilir). Yeni kayıtlarda email_verified=0 başlar,
-- doğrulama linki tıklanınca 1 olur.

ALTER TABLE users ADD COLUMN email TEXT;
ALTER TABLE users ADD COLUMN email_verified INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN verification_token TEXT;
ALTER TABLE users ADD COLUMN token_expires_at TEXT;
ALTER TABLE users ADD COLUMN password_reset_token TEXT;
ALTER TABLE users ADD COLUMN password_reset_expires_at TEXT;

-- Eski kullanıcıları grandfathered yap (email yok → bypass)
UPDATE users SET email_verified = 1;

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users(email) WHERE email IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_users_verification_token ON users(verification_token) WHERE verification_token IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_users_password_reset_token ON users(password_reset_token) WHERE password_reset_token IS NOT NULL;
