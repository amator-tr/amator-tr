-- Sec hardening (F2): Session token revocation.
-- Kullanicinin parolasi degistiginde / admin tarafindan reset edildiginde /
-- yetkisi degistiginde tum aktif sessionlari geçersiz kilmak icin sayac.
-- createSessionToken payload'a `tv` koyar; verifySession DB'deki guncel
-- degerle karsilastirir, esit degilse session reddedilir.
ALTER TABLE users ADD COLUMN token_version INTEGER NOT NULL DEFAULT 0;
