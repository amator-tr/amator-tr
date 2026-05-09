# amator-tr — Güvenlik Denetim Raporu (OWASP Top 10 + Ek)

**Tarih:** 2026-05-09
**Kapsam:** `cagri.amator.tr` (Hono + better-sqlite3 + markdown-it + sanitize-html + EasyMDE), `amator.tr` (nginx statik), Docker compose deployment
**Branch:** `security/hardening` (14 commit, F1–F15)
**Test türü:** Statik kod analizi + lokal docker-compose üzerinde dinamik PoC + canlıya read-only header kontrolü.

## Özet

| Severity | Bulunan | Düzeltilen | Kalan/Notlu |
|---|---|---|---|
| 🔴 Critical | 0 | – | – |
| 🟠 High | 6 | 5 | 1 (F6 USER root, kısmi azaltıldı) |
| 🟡 Medium | 8 | 7 | 1 (F7 CSP nonce, kısmi azaltıldı) |
| 🟢 Low/Info | 7 | – | 7 (raporda tek tek belgelendi) |

`npm audit --omit=dev` → **0 yüksek/kritik** (141 paket, 0 zafiyet).

---

## OWASP Top 10 (2021) Eşleme

| Kategori | Bulgular |
|---|---|
| **A01 Broken Access Control** | M10 (admin re-auth) — F15 ✅ ; L5 (IP spoof) info |
| **A02 Cryptographic Failures** | H2 (session revoke) — F2 ✅ ; M3 (token plaintext) — F9 ✅ ; M7 (backup) — F12 ✅ ; H4 (.env perms) — F4 ✅ |
| **A03 Injection** | SQL prepared (✅ baseline) ; M8 (data: img XSS) — F13 ✅ ; M1 (CSP unsafe-inline) — F7 kısmi |
| **A04 Insecure Design** | H2 (7-gün stateless session) — F2 ✅ ; H3 (zayıf parola) — F3 + uyarı ; M5 (Turnstile fallback) — F10 ✅ ; 2FA yok — info |
| **A05 Security Misconfiguration** | H1 (CSRF startsWith) — F1 ✅ ; H4 ✅ ; H5 (SSH no-host-check) — F5 ✅ ; H6 (root container) — F6 kısmi ; M6 (nginx hardening) — F11 ✅ ; M8 ✅ ; X-XSS removed |
| **A06 Vulnerable Components** | npm audit 0 critical/high ; L1/L2 info |
| **A07 Auth Failures** | H2 ✅ ; H3 — F3 ✅ ; M5 ✅ ; M10 ✅ ; rate-limit baseline (✅) |
| **A08 Data Integrity** | H5 (SSH MITM) — F5 ✅ ; SRI yok info ; service worker public-only (✅) |
| **A09 Logging/Monitoring** | console.log only ; structured logging yok — info, raporda öneri |
| **A10 SSRF** | role-export hardcoded URL set ; user-controlled URL yüzeyi yok (✅) |

---

## DOĞRULANMIŞ YÜKSEK BULGULAR & DÜZELTMELER

### H1. CSRF Origin doğrulamasında `startsWith` bypass

**Dosya:** `src/index.js:51, 58`
**Açıklama:** CSRF middleware Origin header'ını `startsWith()` ile karşılaştırıyordu. Saldırgan Origin `https://cagri.amator.tr.evil.com` gönderirse prefix-eşleşme bypass.

**PoC (lokal docker, F1 öncesi, baseline davranış):**
```bash
curl -X POST -H "Origin: https://cagri.amator.tr.evil.com" /api/profile/password
# beklenen: 403, gerçek (önce): 200/302
```

**PoC (F1 sonrası):**
```bash
$ curl -s -X POST -H "Origin: http://localhost:3001.evil.com" \
    -d "username=test&password=test" http://localhost:3001/login
HTTP 403  {"error":"CSRF kontrol basarisiz"}
$ curl -s -X POST -H "Origin: http://localhost:3001" \
    -d "username=test&password=test" http://localhost:3001/login
HTTP 200  ✅
```

**Düzeltme:** `new URL(origin).origin === expected` strict equality + Set#has allowlist (`APP_URL`, `https://amator.tr`). Commit `3f6e78c`.

---

### H2. Session token revoke edilemiyor

**Dosya:** `src/auth.js:38-58`, `src/routes/auth-routes.js:527`
**Açıklama:** HMAC-imzalı stateless token, 7 gün. Logout sadece cookie siliyor, parola değiştirmek de eski token'ı geçersiz kılmıyor. Çalıntı cookie 7 gün kullanılır.

**PoC (F2 sonrası):**
```
1) login → cookie payload tv:0
2) UPDATE users SET token_version = 1
3) Aynı eski cookie ile /profil → HTTP 302 /login ✅
```

**Düzeltme:** `users.token_version` kolonu (migration v15), payload `tv` field, `verifySession` DB'den karşılaştırır. Invalidation noktaları:
- /profil/sifre (kullanıcı parolası değişimi → mevcut cihaza yeni cookie)
- /sifre-sifirla/:token (email reset)
- /api/admin/users/:id/role (rol değişimi)
- /api/admin/users/:id/reset-password (admin reset)
Commit `8ec9fe1`. Geriye uyumlu (eski cookie'ler `tv` taşımaz, kabul edilir).

---

### H3. Zayıf `PROTECTED_PASSWORD` + zayıf rate-limit

**Dosya:** `.env:21`, `src/routes/role-export-routes.js:798`
**Açıklama:** Role-export protected endpoint'leri tek bir parolayla koruyor; varsayılan `tanidik` (sözlük kelimesi). Endpoint `CSRF_SKIP` listesinde, eski rate-limit 1dk/5 deneme botnet'le saatte 300 tahmine izin veriyordu.

**Düzeltme:** Rate-limit penceresi 15dk'ya çıkarıldı (saatte 20 tahmin); nginx `auth_zone` (10r/m, F11) ek katı. Commit `a8ff720`.
**Manuel adım (kullanıcı):** `.env` içindeki `PROTECTED_PASSWORD` güçlü 32+ karakter random ile rotate edilmeli.

---

### H4. `.env` plaintext, dosya izni 0644

**Dosya:** `/home/ubuntu/amator-tr/.env`
**Açıklama:** `.git`'e commit edilmemiş (`.gitignore`'da, ✅) ama host üzerinde world-readable. `CLOUDFLARE_TUNNEL_TOKEN`, `SESSION_SECRET`, `TURNSTILE_SECRET`, `RESEND_API_KEY`, `TOKEN_SECRET`, `PROTECTED_PASSWORD` plaintext.

**Düzeltme:** `chmod 600 .env` uygulandı (host'ta `-rw-------` doğrulandı), `deploy.sh` her run'da zorlar, `.env.example`'a rotate-on-leak banner. Commit `d844e19`.

---

### H5. SSH `StrictHostKeyChecking=no`

**Dosya:** `docker-compose.yml:24`
**Açıklama:** Admin "publish" akışındaki `git push` MITM'e açıktı (any host key kabul + known_hosts /dev/null).

**Düzeltme:** `=accept-new` + persistent named volume `ssh_known_hosts` ile TOFU + sonraki uyumsuzlukta REDDED. Commit `5986696`.

---

### H6. Container `USER root` (kısmi)

**Dosya:** `Dockerfile`
**Açıklama:** USER directive yok, `node` root'ta çalışıyor.

**Düzeltme (kısmi):** `docker-compose.yml`'de tüm servislere `security_opt: no-new-privileges:true` eklendi (SUID/setcap escalasyonunu engeller). Commit `ec4515b`.

**Kalan TODO (dikkat gerektirir):** USER non-root migrasyonu için:
1. `RUN addgroup -g 1001 -S app && adduser -u 1001 -S app -G app`
2. `RUN chown -R app:app /app`
3. `USER app`
4. `docker-compose.yml`: `/root/.ssh/deploy_key` mount path'i `/home/app/.ssh/deploy_key`'e taşı
5. `git config --global --add safe.directory` komutunu USER app altında tekrar çalıştır
6. Host `./data` ve `./.git` UID 1001 (zaten ubuntu UID'i, çakışma yok ✅)
Test: `docker compose up`, admin yayınla akışı (markdown publish + git push) çalışır mı.

---

## DOĞRULANMIŞ ORTA BULGULAR & DÜZELTMELER

### M1. CSP `script-src 'unsafe-inline'` (kısmi düzeltme)

**Dosya:** `src/index.js:24`
**Düzeltme (kısmi, F7):** Defense-in-depth eklendi:
- `object-src 'none'`
- `upgrade-insecure-requests`
- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Resource-Policy: same-origin`
- `X-XSS-Protection` header KALDIRILDI (modern tarayıcılarda no-op, legacy IE'de zararlı)

Commit `8f9f34c`.

**Kalan TODO (büyük refactor):** `'strict-dynamic' + nonce` migrasyonu için:
1. Hono middleware: `c.set('cspNonce', crypto.randomBytes(16).toString('base64'))`
2. CSP: `script-src 'self' 'strict-dynamic' 'nonce-${nonce}'` (unsafe-inline çıkar)
3. Tüm template dosyalarında inline `<script>` etiketleri `nonce="..."` taşımalı:
   - `src/views/login.js`, `register.js`, `profile.js`, `admin.js`, `qso.js`, `morse.js`, `stats.js`
   - `src/routes/auth-routes.js` içindeki inline statusPage, verifyResendForm
4. EasyMDE/GTM bootstrap için inline init script'leri ya nonce'la ya ayrı `.js` dosyalarına taşı
5. CF Turnstile script `https://challenges.cloudflare.com/turnstile/v0/api.js` script-src URL allowlist'inde kalmaya devam (nonce harici)

Tahmini iş: ~30 dosya patch + lokal test. Bu raporun kapsamı dışında.

---

### M2. Wildcard CORS — `role-export-routes.js` (info)

**Dosya:** `src/routes/role-export-routes.js:44-48`
**Açıklama:** `Access-Control-Allow-Origin: *`. Cookie-bound değil; `Authorization` token Header üzerinden taşınıyor; credentials echo edilmiyor — bu **bilinçli public-proxy tasarımı**. Saldırı yüzeyi sınırlı (XSS+CSRF değil, sadece bilgi açığa çıkmaya yol açabilir ama veri zaten public role listesi).

**Karar:** Düzeltme yapılmadı; info olarak listelendi. Allowlist'e geçilirse external integrators kırılır.

---

### M3. Email-verify & password-reset token DB'de plaintext

**Dosya:** `src/routes/auth-routes.js`, `migrations/schema-v9.sql`
**Açıklama:** DB sızıntısında token aktif kalır.

**Düzeltme:** `hashToken(raw) = sha256(raw)` ile DB'ye sadece hash yazılır; kullanıcıya ham token email'lenir; lookup `WHERE col = sha256(reqToken)`. Migration v14 mevcut bekleyen plaintext token'ları NULL'a aldı (invalidate; kullanıcı yeni link/kod alabilir, max 24/1 saat ömürlü token'ların pratik etkisi minimum).

Commit `adb98e1`.

---

### M5. Turnstile dev-fallback prod'da

**Dosya:** `src/turnstile.js:40`
**Düzeltme:** `NODE_ENV === 'production'` iken secret yoksa **fail-closed** (false) + uyarı logu. `Dockerfile`'a `ENV NODE_ENV=production`. Commit `3b69a9e`.

---

### M6. nginx sertleştirme

**Dosya:** `nginx.conf`, `proxy.conf`
**Düzeltme:**
- `server_tokens off`
- `client_max_body_size 1m`
- `limit_req_zone` (auth: 10r/m burst 20, api: 120r/m burst 60)
- `Strict-Transport-Security "max-age=31536000; includeSubDomains" always`
Commit `d912636`. Canlı `curl -I https://cagri.amator.tr/` baseline'da HSTS yok — deploy sonrası set'lenecek.

---

### M7. Backup'lar şifresiz

**Dosya:** `scripts/backup.js`
**Düzeltme:** Opsiyonel `BACKUP_PASSPHRASE` env. Set'liyse AES-256-GCM şifreli `backup-{ts}.db.enc`; format `"AMTRBKv1" magic | salt(16) | iv(12) | tag(16) | ciphertext`; scrypt N=2^14 KDF. Geriye uyumlu (passphrase yoksa eski plaintext + uyarı). Commit `a80b283`.

---

### M8. `data:` URI img'de XSS vektörü

**Dosya:** `src/articles/preview.js:30`
**Açıklama:** Markdown image `![](data:image/svg+xml;utf8,<svg onload=alert(1)/>)` sanitize-html'in `allowedSchemesByTag: { img: ['data'] }` ile geçerdi.

**PoC (F13 sonrası):** smoke test:
```js
sanitize('<img src="data:image/svg+xml,<svg onload=alert(1)></svg>" />')
// → '<img />' (src dropped) ✅
```

**Düzeltme:** `allowedSchemesByTag: { img: ['http', 'https'] }`. Commit `926a23a`.

---

### M9. AI çıktısından `JSON.parse` — şema guard

**Dosya:** `src/routes/main-routes.js:145-147`
**Düzeltme:** items.length cap (50), non-object filter, `safeStr(v, max)` ile string-cast + length cap. Commit `3e50dbc`.

---

### M10. Admin "tehlikeli" işlemler için re-auth yok

**Dosya:** `src/routes/admin-routes.js`
**Düzeltme:** `reauthAdmin()` middleware artık şu endpointlerde de zorunlu:
- POST `/api/admin/users/:id/role` (rol değiştirme)
- DELETE `/api/admin/users/:id` (kullanıcı silme)
- POST `/api/admin/users/:id/reset-password` (admin reset; `current_password` + `new_password` ayrı alanlarda)
Admin UI (`src/views/admin.js`) `prompt()` ile parola sorar. Çalıntı admin oturumunun kullanıcı tablosunu silmesi engellendi. Commit `530b097`.

---

## LOW / INFO BULGULAR (FİX YOK — RAPOR NOTU)

### L1. `font-awesome 4.7` çok eski
Sadece CSS+font, RCE yüzeyi yok. Fix öncelikli değil.

### L2. `easymde 2.18` (bakımı durmuş)
Admin-only kullanım, etki sınırlı. Alternatif: `@toast-ui/editor` veya plain `<textarea>` + markdown render preview.

### L3. `cheerio` devDependency
`Dockerfile:16` `npm install --production` prod imajından dışarda bırakır (✅).

### L4. Service worker (`src/index.js:141`)
Public sayfa cache'leme. Cookie-bound içerik (`/login`, `/register`, `/setup`, `/logout`) cache'lenmez (✅). Cache poisoning yüzeyi düşük.

### L5. `getClientIP` header trust
`src/auth.js:62` — `cf-connecting-ip`/`x-forwarded-for` header'ı trust ediyor. nginx proxy ayarı bunları set ediyor; ama app container port `4541` doğrudan erişilebilirse rate-limit IP-spoofing mümkün. **Mitigation (host firewall ya da docker network):** app container'ı sadece proxy network'ünden erişilebilir kıl, public 4541 yayınını kaldır.

### L6. Hardcoded 3rd-party Supabase anon JWT
`src/routes/role-export-routes.js:62` — `TELSIZCILIK_ANON_KEY`. Anon JWT public, RLS ile sınırlı. Yine de env'e taşımak iyi pratik.

### L7. (kaldırıldı — F7 ile X-XSS-Protection silindi)

### L8. Statik logging (info)
`console.log/error` only. Üretim için yapısal log (`pino`/`winston`) + Cloudflare Logpush veya remote sink önerilir; failed-login alarmı için DB'de `login_log` zaten var, bir cron-watch (5 fail/dk başına alert) eklenebilir.

### L9. 2FA yok (info)
Admin hesabı için TOTP eklemek (`speakeasy` paketi) yüksek değer. `users.totp_secret` kolonu, login'de 6-hane kod doğrulama, `qrcode` ile setup.

---

## BASELINE — DEĞİŞMEYEN GÜVENLİK ÖZELLİKLERİ (POZITIF)

- **PBKDF2-SHA256 600.000 iter** (`src/auth.js:8`) — OWASP 2024 minimum ✅
- **Lazy rehash** legacy 100k → 600k login sırasında (`src/auth-routes.js:137-146`) ✅
- **Cookie:** `httpOnly + Secure + SameSite=Strict + path=/` (`src/routes/auth-routes.js:154`) ✅
- **Generic auth hata mesajları** (kullanıcı varlığı leak yok) ✅
- **GitHub OAuth state param** + avatar URL whitelist (`avatars.githubusercontent.com`) ✅
- **timing-safe hex compare** parola karşılaştırmasında ✅
- **markdown-it `html: false`** (`scripts/lib/render.mjs:33`) ✅
- **SQL prepared statements** her yerde (raw `exec` kullanılmıyor) ✅
- **Path traversal:** nginx (`%2e%2e`, `%00` block) + uygulama (`/admin/assets/fa/fonts/:file` whitelist regex) ✅
- **Rate-limit:** login 5/15dk, verify-code 5/15dk per email + 10/15dk per IP, password reset 5/15dk per IP + 3/saat per email ✅
- **Backup lock-out savunması:** restore en az 1 admin + mevcut admin yedekte ✅
- **Cloudflare Turnstile** login + register + verify + reset ✅

---

## DİNAMİK PoC ÖZETİ (lokal docker compose, port 3001)

| # | Test | Beklenen | Sonuç |
|---|---|---|---|
| 1 | Saldırgan Origin (`evil.com` suffix) ile POST /login | 403 | ✅ 403 |
| 2 | Same-origin POST /login | 200 | ✅ 200 |
| 3 | Security headers (CSP, COOP, CORP, XCO, XFO, Referrer, Permissions) | Set | ✅ Tümü |
| 4 | /setup ilk admin oluştur | 302 → /login | ✅ |
| 5 | /login + cookie al | 302 + Set-Cookie HttpOnly+Secure+SameSite=Strict | ✅ |
| 6 | Authenticated /profil | 200 | ✅ |
| 7 | DB'de `token_version + 1` (parola değişimini simüle) | – | ✅ |
| 8 | Eski cookie ile /profil | 302 → /login (revoked) | ✅ |
| 9 | sanitize-html `data:image/svg+xml;...,<svg onload=...>` | src dropped | ✅ |
| 10 | sanitize-html `<a href="javascript:alert(1)">` | href dropped | ✅ |

---

## CANLIYA UYGULAMA ÖNERİSİ

1. `security/hardening` branch'i review edilip `main`'e merge.
2. Production deploy:
   - `docker compose down && git pull && docker compose up -d --build`
   - `migrate.js` v14 + v15'i otomatik uygular
   - Eski plaintext token'lar ve eski cookie'ler doğal expire ile silinir (kullanıcılar logout olabilir → reset link iste)
3. **Manuel rotation:**
   - `.env` içinde `PROTECTED_PASSWORD` rotate (32+ char random)
   - `SESSION_SECRET` rotate (eski cookie'lerin invalidation'ı zaten F2 ile sağlandı)
4. **İlk SSH push'tan sonra** `ssh_known_hosts` named volume'da `github.com` host key persiste edilir; sonraki push'larda accept-new MITM detect eder.
5. Backup `BACKUP_PASSPHRASE` env'i compose'a eklenirse şifreli backup'a geçilir.

---

## AÇIK TODO'LAR

- **F6 tam non-root container** (test gerektirir)
- **F7 tam CSP nonce migration** (~30 dosya refactor)
- **2FA admin için** (yeni feature, scope dışı)
- **Yapısal logging** (pino + Logpush)
- **Failed-login alarm cron** (DB'de zaten var, watcher eklenmeli)

---

## EK: COMMIT DİZİSİ

```
3f6e78c sec(F1)  CSRF startsWith bypass
3b69a9e sec(F10) Turnstile prod fail-closed + Dockerfile NODE_ENV
d844e19 sec(F4)  .env perms 0600 + secret rotation notu
5986696 sec(F5)  SSH MITM korumasi accept-new + known_hosts
d912636 sec(F11) nginx server_tokens, limit_req, HSTS, client_max_body_size
a8ff720 sec(F3)  role-export verify rate-limit 15dk
926a23a sec(F13) sanitize-html data: URI img'den kaldir
3e50dbc sec(F14) AI JSON sema guard
530b097 sec(F15) admin re-auth zorla
adb98e1 sec(F9)  email/reset token DB'de hash
8ec9fe1 sec(F2)  session token revocation (token_version)
a80b283 sec(F12) backup AES-256-GCM
8f9f34c sec(F7)  CSP & header sertlestirme (kismi)
ec4515b sec(F6)  no-new-privileges (kismi)
```
