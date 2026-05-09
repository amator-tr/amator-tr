# amator.tr

Türkiye amatör telsiz topluluğu için açık kaynak portal. Tek bir Docker Compose ile üç subdomain'den hizmet veren bir uygulama: rehber içeriği, çağrı işareti defteri ve admin dosya yönetimi.

> **Site:** [amator.tr](https://amator.tr) · **Çağrı Defteri:** [cagri.amator.tr](https://cagri.amator.tr) · **Dosyalar:** [dosyalar.amator.tr](https://dosyalar.amator.tr)
> **Kaynak:** [github.com/amator-tr/amator-tr-source](https://github.com/amator-tr/amator-tr-source) · **Lisans:** MIT

---

## Üç Subdomain, Tek Origin

| Subdomain | Ne Yapar | Backend |
|---|---|---|
| **`amator.tr`** | Statik site: 91 tutorial (anten, propagasyon, FT8, mors vs.), interaktif araçlar (anten hesaplayıcı, CTCSS bulucu, Maidenhead grid, RF görüş hattı, lisans sınavı simülatörü), tag/kategori sayfaları | `web` (nginx, statik) |
| **`cagri.amator.tr`** | Dinamik kullanıcı uygulaması: kayıt + login, operatör profili, QSO defteri, mors pratiği, admin paneli (kullanıcı yönetimi, makale editörü, dosya yükleme) | `app` (Node + Hono + SQLite) |
| **`dosyalar.amator.tr`** | Admin tarafından yüklenen görsel/dosyaların public mirror'ı + admin upload UI'sı (`/yukle`). Otomatik kategorilere ayrılır (img, pdf, video, audio, arşiv, exe, doc, diger) | `app` (upload API) + `web` (autoindex + static serve) |

Tüm subdomain'ler **Cloudflare Tunnel** üzerinden tek origin'e yönlenir. `proxy` (nginx reverse proxy) `Host` header'ına bakıp `app` veya `web`'e yönlendirir. Cookie `Domain=.amator.tr` scope'lu — admin oturumu üç domain'e de geçerli.

---

## Hızlı Başlangıç

### Gereksinimler

- Docker + Docker Compose
- Cloudflare hesabı (Tunnel için, opsiyonel — local dev'de gerek yok)
- GitHub deploy SSH key (admin makale yayınlama akışı için)

### Kurulum

```bash
git clone git@github.com:amator-tr/amator-tr.git
cd amator-tr
cp .env.example .env
# .env'i düzenle: SESSION_SECRET, TURNSTILE_*, RESEND_API_KEY,
# GITHUB_CLIENT_ID/SECRET (OAuth), COOKIE_DOMAIN=.amator.tr (prod)
chmod 600 .env

# İlk deploy
docker compose up -d --build
```

App container ilk başlatmada otomatik migration çalıştırır (`src/migrate.js` → `migrations/schema-v*.sql`).

Cloudflare Tunnel kullanıyorsan dashboard'dan üç hostname için ingress kuralı ekle: hepsi `http://proxy:80` adresine.

### Deploy script'i

```bash
bash deploy.sh
```

Sırasıyla: `git pull --ff-only` → `docker compose up -d --build` → (creds varsa) Cloudflare cache purge.

### Geliştirme komutları

| Komut | Açıklama |
|---|---|
| `npm run start` | Production server |
| `npm run dev` | `node --watch` ile auto-reload |
| `npm run migrate` | DB migration runner |
| `npm run build` | Tutorial + page MD'leri HTML'e çevir |
| `npm run build:force` | Build cache bypass |
| `npm run backup` | Manuel DB yedeği |
| `npm run extract` | Mevcut HTML'leri MD'ye geri çevir (one-shot bootstrap) |

---

## Mimari

```
                            ┌─ Cloudflare Tunnel (proxied) ─┐
                            │                                │
                            ▼                                ▼
                    ┌──────────────────────────────────────────┐
                    │  proxy (nginx)  port 80                  │
                    │  proxy.conf — server_name router         │
                    └────┬────────────┬──────────┬─────────────┘
                         │            │          │
            amator.tr ──▶│            │          │
       cagri.amator.tr ──┼────────────┤          │
    dosyalar.amator.tr ──┤            │          │
                         ▼            ▼          ▼
                    ┌─────────┐  ┌──────────┐
                    │ web     │  │ app      │
                    │ nginx   │  │ Hono     │
                    │ static  │  │ Node 20  │
                    │ + autoix│  │ + SQLite │
                    └─────────┘  └──────────┘
                       ▲              │
                       │              │
                  ./public/       ./data/cagri.db
                  ./data/dosyalar/(ro mount)   ./data/dosyalar/(rw)
                  ./content/, ./scripts/
```

### Docker servisleri (`docker-compose.yml`)

- **`app`** — Node.js 20, Hono. Build: `Dockerfile`. Volumes: `./data`, `./content`, `./public`, `./scripts`, `./.git`, deploy SSH key. Healthcheck: `/robots.txt`. Port: `4541:3000`.
- **`web`** — nginx:alpine. Static + SSI footer. Volumes: `./public:ro`, `./data/dosyalar:ro` (autoindex). Port: `4540:80`. Config: `nginx.conf`.
- **`proxy`** — nginx:alpine. Reverse proxy, üç server_name block. Volumes: `./proxy.conf:ro`. Port: `80:80`. Config: `proxy.conf`.
- **`backup`** — `tools` profile. `node scripts/backup.js` → `./data/backup-YYYY-MM-DD.db(.enc)`. Cron'la `03:00`'te tetiklenir (`scripts/setup-cron.sh`).

---

## Modüller

### Backend rotaları (`src/routes/`)

| Dosya | Endpoint grubu | Ne yapar |
|---|---|---|
| `auth-routes.js` | `/login`, `/register`, `/profil`, `/sifre-sifirla`, `/auth/github` | Hesap, email doğrulama, parola reset, GitHub OAuth, session token |
| `main-routes.js` | `/`, `/ekle`, `/api/all`, AI asistan | Operatör kayıt + listeleme, AI tabanlı operatör çıkarma, içerik moderasyon |
| `qso-routes.js` | `/qso`, `/api/qso` | Radyo konuşması (QSO) defteri — band/mode/tarih filtreli |
| `morse-routes.js` | `/morse`, `/api/morse/*` | Mors pratiği, AI ile rastgele kelime üretimi |
| `admin-routes.js` | `/admin`, `/api/admin/users` | Admin paneli: kullanıcı listesi, rol değişimi, password reset (re-auth) |
| `admin-articles-routes.js` | `/api/admin/articles[/...]` | Makale + sayfa CRUD, EasyMDE editör, publish (git commit + push + build) |
| `admin-uploads-routes.js` | `/api/dosyalar/*`, `/yukle` | Admin dosya yükleme: chunked upload, magic-byte log, rename + ref refactor, bulk delete |
| `role-export-routes.js` | `/api/role-export/*` | 4 farklı Türk röle veritabanı için proxy (4 saat cache, password-protected airband/marine) |
| `stats-routes.js` / `stats-public-routes.js` | `/api/stats/*` | İç istatistik + public ping/download/like sayaçları |

### View'lar (`src/views/`)

Hono-style template generator'lar — saf JS string template'leri:
`admin.js`, `dashboard.js`, `frequency-guide.js`, `login.js`, `main.js`, `morse.js`, `profile.js`, `qso.js`, `register.js`, `yukle.js`.

### Yardımcılar (`src/`)

- **`auth.js`** — PBKDF2-SHA256 (600K iter), HMAC-imzalı session token (7 gün), `token_version` revocation, cookie refresh middleware (subdomain scope geçişi)
- **`db.js`** — better-sqlite3 wrapper (D1-style async API), WAL mode
- **`migrate.js`** — Migration runner; eklenmemiş `migrations/schema-v*.sql`'leri uygular
- **`turnstile.js`** — Cloudflare Turnstile doğrulama (prod fail-closed)
- **`email.js`** — Resend transactional email (verify, password reset)
- **`moderation.js`** — Cloudflare Workers AI ile içerik moderasyonu + prompt injection guard
- **`articles/`** — Git ops, build pipeline çağrıları, OG image üretimi, sanitize, validate
- **`uploads/categorize.js`** — Dosya uzantısı → kategori map + magic-byte allowlist + lenient filename sanitize

---

## MD-Driven İçerik Pipeline

`scripts/build.mjs` Markdown kaynaklarını statik HTML'e çevirir:

| Kaynak | Çıktı | Template |
|---|---|---|
| `content/tutorials/<slug>.md` (91 dosya) | `public/tutorials/<slug>.html` | `scripts/templates/tutorial.html` |
| `content/pages/<slug>.md` (hakkinda, iletisim, sozluk) | `public/<slug>/index.html` | `scripts/templates/page.html` |
| Tüm tutorial keyword'ları | `public/tutorials/tag/<keyword>/index.html` | `scripts/templates/tag.html` |
| Tutorial hub | `public/tutorials/index.html` | `scripts/templates/index.html` |
| — | `public/sitemap.xml`, `public/feed.xml` | `scripts/templates/sitemap.xml`, `feed.xml` |
| — | `public/_includes/footer.html` | `scripts/templates/_footer.html` |

**Cache:** SHA-256(frontmatter + body + shellHash) — değişmemiş makaleler skip.
**OG image:** Yayınlanmamış makalede admin push'unda `@resvg/resvg-js` ile SVG → PNG.
**SSI footer:** `public/_includes/footer.html` tek kaynak; nginx `ssi on; ssi_types text/html;` ile statik HTML'lere `<!--#include virtual="/_includes/footer.html" -->` enjekte.

### Admin makale yayınlama akışı

1. `cagri.amator.tr/admin` → "Makaleler" tab → makale seç (veya yeni)
2. EasyMDE'de markdown düzenle (görsel butonu otomatik upload — bkz. dosyalar)
3. Kaydet (taslak) veya Yayınla
4. Yayınla → DB INSERT (`article_versions`) → `.md` dosyaya yaz → OG üret → `runBuild()` → `git add/commit/push`
5. Hata olursa otomatik rollback (md restore + `git reset --hard`)

---

## Dosya Yönetimi (`dosyalar.amator.tr`)

Admin tek tıkla görsel/dosya yükler, public URL alır. Makale editörü EasyMDE bu URL'i otomatik yapıştırır.

### Özellikler

- **Otomatik kategori:** `.png` → `img/`, `.pdf` → `pdf/`, `.mp4` → `video/`, `.mp3` → `audio/`, `.zip` → `arsiv/`, `.exe`/`.dmg`/`.deb` → `exe/`, `.doc`/`.docx` → `doc/`, allowlist dışındakiler `diger/`
- **Orijinal isim korunur:** Türkçe karakter, boşluk, parantez, emoji destekleniyor (NFC normalize + path-traversal temizleme)
- **Çakışma çözümü:** Aynı isimde dosya varsa modal açılır — "Yeniden adlandır (`foo (2).png`)" / "Üzerine yaz" / "İptal"
- **Riskli uzantı onayı:** Allowlist dışı (`.iso`, `.apk`, `.bin` vb.) için modal — "Yine de yükle" → `?force=true` ile kategori `diger/`. Toplu seçimde tek modal hepsini sorar.
- **Magic-byte log-only:** `file-type` ile içerik kontrolü; uyumsuzluk audit log'a düşer ama yükleme reddedilmez (false-rejection'lar admin akışını bozmasın)
- **100 MB üstü için chunked upload:** 90 MB chunk'lar halinde gönderir, server `data/dosyalar/.tmp/<id>.part` dosyasında birikir, finalize'da magic-byte + atomik rename. 5 GB'a kadar
- **Progress:** "234 MB / 2.0 GB · 12.5 MB/s · kalan 2dk 30sn · parça 3/22"
- **İptal butonu:** Aktif yüklemeyi durdurur (xhr.abort + chunked stop)
- **Rename + auto-refactor:** Bir dosyayı yeniden adlandırırken referansları (markdown'larda + DB'deki taslaklarda) otomatik günceller, `runBuild` + git push yapar
- **Bulk select + delete:** Listede checkbox'lar, tek password reauth ile birden fazla dosya silme

### API

| Method | Path | Açıklama |
|---|---|---|
| `GET` | `/api/dosyalar/list` | Filtre + arama (admin) |
| `POST` | `/api/dosyalar/upload` | Multipart, ≤90 MB. Query: `on_conflict`, `force` |
| `POST` | `/api/dosyalar/upload/init` | Chunked init (büyük dosyalar) |
| `POST` | `/api/dosyalar/upload/chunk` | Raw octet-stream, `X-Upload-Id` header |
| `POST` | `/api/dosyalar/upload/finalize` | Magic-byte + atomik rename + DB INSERT |
| `GET` | `/api/dosyalar/:id/refs` | URL'in markdown ve DB'deki referansları |
| `POST` | `/api/dosyalar/:id/rename` | `{new_name, update_refs}` — rename + opsiyonel auto-refactor |
| `DELETE` | `/api/dosyalar/:id` | Tek dosya sil (password reauth) |
| `POST` | `/api/dosyalar/bulk-delete` | `{password, ids[]}` — toplu sil |

---

## Veritabanı Şeması

SQLite (better-sqlite3, WAL mode), 17 migration. Önemli tablolar:

| Tablo | Amaç |
|---|---|
| `users` | id, username, password_hash/salt, password_iterations (PBKDF2), token_version, role, last_login, github_id, avatar |
| `operatorler` | user_id, operator, cagri_isareti (UNIQUE), qth, hakkinda, updated_at |
| `qso_log` | user_id, tarih, saat, cagri_isareti, bant, mod, notlar |
| `articles` | slug, type (`tutorial`\|`page`), title, status (draft/published/archived), markdown_source, frontmatter_yaml, published_at, version |
| `article_versions` | article_id, content_md, created_at — rollback için snapshot |
| `uploads` | original_name, stored_path UNIQUE, category, mime, size, sha256, uploaded_by, uploaded_at |
| `moderation_log` | icerik, sonuc, created_at |
| `login_log` | email, ip, reason, created_at — failed-login tracking |
| `_migrations` | name PRIMARY KEY — migration runner state |

### Son migration'lar

- **`schema-v14.sql`** — Email/reset token plaintext → SHA-256 hash, mevcut bekleyen tokenları NULL'a alır
- **`schema-v15.sql`** — `users.token_version` (parola değişiminde tüm session'ları invalidate)
- **`schema-v16.sql`** — `articles.type` ('tutorial' \| 'page'), admin-editlenebilir statik sayfalar
- **`schema-v17.sql`** — `uploads` tablosu (dosyalar.amator.tr)

---

## Güvenlik

`SECURITY_AUDIT.md` 15 commit (F1–F15) ile OWASP Top 10 kapsamı. Vurgular:

- **Auth:** PBKDF2-SHA256 600K iter (lazy rehash), HMAC-imzalı session token, `token_version` ile parola değişiminde tüm cihazlarda revocation
- **Cookie:** `httpOnly`, `Secure`, `SameSite=Strict`, `Domain=.amator.tr` (cross-subdomain). `Cross-Origin-Resource-Policy: same-site` (dosyalar) / `same-origin` (cagri)
- **CSRF:** Origin/Referer allowlist (`URL().origin` strict equality, `startsWith` bypass kapalı)
- **Bot/spam:** Cloudflare Turnstile (prod fail-closed), nginx `limit_req_zone` (auth 10r/m, api 120r/m)
- **Email/reset token:** DB'de SHA-256 hash; sızıntıda token kullanılamaz
- **Path traversal:** `safeWrite`/`safeUnlink` ALLOWED_ROOTS whitelist, nginx `\.\.|%2e%2e|%252e` 403
- **XSS:** `markdown-it` `html: false`, `sanitize-html` allowlist, `data:` URI img'den kaldırıldı
- **Upload:** Magic-byte logging (orijinal isim korur), allowlist dışı uzantılar admin onayıyla, nginx `\.svg|\.html?|\.js|\.php|\.sh|\.bat` 403
- **SSH (admin git push):** `accept-new` + persistent `known_hosts` named volume — TOFU + MITM protection
- **Backup:** Opsiyonel AES-256-GCM şifreleme (BACKUP_PASSPHRASE)
- **Container:** `no-new-privileges` (kısmi F6 — non-root migration TODO), CSP `object-src 'none'`, `frame-ancestors 'none'`

---

## Repo Yapısı

```
amator-tr/
├── README.md, SECURITY_AUDIT.md           # Bu dosya + güvenlik raporu
├── .env, .env.example                     # Secrets (chmod 600)
├── docker-compose.yml, Dockerfile         # Servis tanımları
├── proxy.conf, nginx.conf                 # nginx (proxy + web)
├── deploy.sh                              # Tek-tık deploy
├── package.json                           # npm deps + scripts
├── src/
│   ├── server.js, index.js, db.js         # Entry, route mount, DB adapter
│   ├── auth.js, email.js, turnstile.js    # Auth, email, captcha
│   ├── moderation.js, ai.js, helpers.js   # AI moderasyon, helper'lar
│   ├── migrate.js                         # Migration runner
│   ├── routes/                            # API + sayfa route'ları (10 dosya)
│   ├── views/                             # HTML template generator'lar (10 dosya)
│   ├── articles/                          # Makale publish pipeline
│   └── uploads/                           # Dosya yükleme yardımcıları
├── content/
│   ├── tutorials/                         # 91 .md tutorial kaynak
│   └── pages/                             # 3 .md statik sayfa (hakkinda, iletisim, sozluk)
├── scripts/
│   ├── build.mjs                          # MD → HTML build pipeline
│   ├── backup.js, setup-cron.sh           # DB yedek + cron
│   ├── auto-push.sh                       # 30dk'da bir GitHub'a push
│   ├── extract-md.mjs                     # HTML → MD (bootstrap)
│   └── templates/                         # tutorial/page/index/tag/feed/sitemap/footer
├── public/                                # Statik build çıktısı
│   ├── tutorials/, tag/                   # Build çıktıları
│   ├── araclar/                           # Anten, CTCSS, Maidenhead, RF LOS hesaplayıcılar
│   ├── role-export/                       # Röle CSV exporter
│   ├── hakkinda/, iletisim/, sozluk/      # Build edilen sayfalar
│   └── _includes/footer.html              # SSI footer (build üretir)
├── migrations/                            # schema-v2 .. schema-v17.sql
└── data/                                  # Git ignore: SQLite DB + uploads + backups
    ├── cagri.db                           # Ana DB (WAL)
    ├── dosyalar/                          # Admin yüklediği dosyalar (img/, pdf/, ...)
    └── backup-*.db, backup-*.db.enc       # Günlük yedek
```

---

## Cloudflare Tunnel + DNS

Cloudflare dashboard'da:

- **DNS:** `amator.tr`, `cagri.amator.tr`, `dosyalar.amator.tr` → Tunnel CNAME (proxied / turuncu bulut)
- **Tunnel ingress:** Üçü de `http://proxy:80` (single tunnel + Host-based routing nginx'te)
- **SSL/TLS:** Flexible (origin HTTP, edge HTTPS)
- **Cache Rules:** `cagri.amator.tr/api/role-export/*` → 4 saat (eski public proxy)

`deploy.sh` Cloudflare cache purge yapar (`.env`'de `CLOUDFLARE_ZONE_ID` + `CLOUDFLARE_API_TOKEN` varsa).

---

## Yetiştirme & Bakım

- **Cron:**
  - `scripts/setup-cron.sh` — günlük `03:00` DB backup
  - `scripts/auto-push.sh` — 30 dakikada bir uncommitted değişiklikleri GitHub'a push
- **Manuel:** `npm run build:force` cache reset, `npm run check-anchors` makale anchor'larının stabilitesini test eder
- **Migration:** `npm run migrate` (container içinde otomatik çalışır)

---

## Katkı

PR ve issue'lar açık. Anahtar konular:
- Yeni tutorial: `content/tutorials/<slug>.md` ekle, frontmatter (`title`, `description`, `keywords[]`, `article_section`, `published_at`) doldur, `npm run build`. CI yok — admin akışı git push'la birlikte build'i tetikler.
- Yeni statik sayfa (about, contact gibi): `content/pages/<slug>.md` aynı pattern.
- Güvenlik bulguları: `security@amator.tr` (veya GitHub issue private)

---

## Lisans

MIT — Yazar: **Kaan Dikeç (TB2KKD)** · Moderatör: **Cengiz Kaya (TA1WSW)**

[GitHub Source](https://github.com/amator-tr/amator-tr-source) · [Çağrı Defteri](https://cagri.amator.tr) · [Dosyalar](https://dosyalar.amator.tr)
