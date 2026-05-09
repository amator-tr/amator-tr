-- Sec hardening: verification_token ve password_reset_token kolonlari
-- artik plaintext yerine sha256(raw_token) saklanacak. Mevcut bekleyen
-- token'lar (cogu zaten saatler/gunler icinde expire) NULL'a alinarak
-- invalidate edilir, kullanici yeni link/kod isteyebilir.
UPDATE users SET verification_token = NULL WHERE verification_token IS NOT NULL;
UPDATE users SET password_reset_token = NULL WHERE password_reset_token IS NOT NULL;
