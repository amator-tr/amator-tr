# amator.tr — Self-Hosted

Tek Docker Compose ile iki site:

| Servis | Domain | Port | Teknoloji |
|--------|--------|------|-----------|
| **web** | amator.tr | 4540 | nginx (static) |
| **app** | cagri.amator.tr | 4541 | Node.js + Hono + SQLite |
| **proxy** | — | 80 | nginx reverse proxy |

Cloudflare Proxy (turuncu bulut) SSL'i halleder, origin'e HTTP 80 uzerinden baglanir.

## Dizin Yapisi

```
amator-tr/
├── docker-compose.yml      # Tum servisler
├── .env                    # Secret'lar (git'e gitmez)
├── .env.example            # Ornek .env
├── Dockerfile              # app container build
├── proxy.conf              # Reverse proxy (domain routing)
├── nginx.conf              # Static site config
├── src/                    # cagri.amator.tr backend
│   ├── server.js           # Entry point
│   ├── index.js            # Hono app + route mounting
│   ├── db.js               # D1-uyumlu SQLite adapter
│   ├── ai.js               # Cloudflare AI REST adapter
│   ├── auth.js             # PBKDF2 hash, JWT session
│   ├── email.js            # Resend email entegrasyonu
│   ├── moderation.js       # AI icerik moderasyonu
│   ├── turnstile.js        # Cloudflare Turnstile CAPTCHA
│   ├── routes/             # HTTP endpoint handler'lar
│   └── views/              # HTML template generator'lar
├── migrations/             # SQLite migration dosyalari (v2-v11)
├── public/                 # amator.tr static dosyalar
│   ├── index.html
│   ├── tutorials/          # 91 makale
│   ├── araclar/            # Anten, CTCSS, Maidenhead, Propagasyon, Sinav
│   ├── role-export/        # Role Exporter araci
│   ├── sozluk/
│   └── shared/             # Tema CSS/JS
├── data/                   # SQLite DB + backup (git'e gitmez)
│   └── cagri.db
└── scripts/
    ├── backup.js           # SQLite backup (son 30 gun)
    ├── setup-cron.sh       # Gunluk backup cron kurulumu
    └── auto-push.sh        # Degisiklik varsa GitHub'a push
```

## Sifirdan Kurulum

### 1. Sunucuya klonla

```bash
ssh ubuntu@144.24.190.251
git clone git@github.com:amator-tr/amator-tr.git ~/amator-tr
cd ~/amator-tr
```

### 2. .env olustur

```bash
cp .env.example .env
nano .env
```

Doldurulacak degerler:

| Degisken | Aciklama |
|----------|----------|
| `SESSION_SECRET` | `openssl rand -hex 32` ile uret |
| `GITHUB_CLIENT_ID` | GitHub OAuth app |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth app |
| `TURNSTILE_SECRET` | CF Zero Trust > Turnstile |
| `TURNSTILE_SITE_KEY` | CF Zero Trust > Turnstile |
| `RESEND_API_KEY` | resend.com API key |
| `CLOUDFLARE_ACCOUNT_ID` | CF dashboard > Account ID (AI icin, opsiyonel) |
| `CLOUDFLARE_API_TOKEN` | CF API token (AI icin, opsiyonel) |

### 3. Ayaga kaldir

```bash
docker compose up -d
```

Ilk calismada migration'lar otomatik calisir, DB olusturulur.

### 4. Kontrol

```bash
docker compose ps                     # Tum container'lar healthy mi
curl -H "Host: amator.tr" localhost    # Static site
curl -H "Host: cagri.amator.tr" localhost/login  # App
```

### 5. Cloudflare DNS

CF Dashboard'ta her iki domain icin:

- `amator.tr` → A record → sunucu IP → **Proxied** (turuncu bulut)
- `cagri.amator.tr` → A record → sunucu IP → **Proxied** (turuncu bulut)
- SSL/TLS → **Flexible**

### 6. Cron job'lar

```bash
# Gunluk DB backup (gece 03:00)
bash scripts/setup-cron.sh

# 30 dakikada bir GitHub'a push (degisiklik varsa)
crontab -e
# Ekle: */30 * * * * /home/ubuntu/amator-tr/scripts/auto-push.sh >> /home/ubuntu/amator-tr/data/push.log 2>&1
```

## Gunluk Islemler

```bash
# Loglari gor
docker compose logs app --tail 50
docker compose logs web --tail 50

# Restart
docker compose restart

# Tamamen durdur / baslat
docker compose down
docker compose up -d

# DB backup (manuel)
docker compose run --rm backup

# Static dosyalari guncelle (lokal'den)
rsync -avz --delete public/ ubuntu@144.24.190.251:~/amator-tr/public/
docker compose restart web
```

## Guvenlik

- `.env`, `.git`, `data/`, `migrations/`, `scripts/` disaridan erisilemez (nginx block)
- Path traversal koruması (`..`, `%2e%2e`, `%252e`, `%00` bloklanir)
- Bilinmeyen host'lar 444 ile kapatilir
- Sifreler PBKDF2-SHA256 (600K iterasyon) ile hashlenir
- Session: HMAC-SHA256 signed cookie (7 gun)
- CSRF: Origin header kontrolu
- CSP, X-Frame-Options, HSTS header'lari aktif

## Teknoloji

- **Runtime:** Node.js 20 + Hono framework
- **DB:** SQLite (better-sqlite3, WAL mode)
- **Static:** nginx:alpine
- **Proxy:** nginx:alpine (domain-based routing)
- **SSL:** Cloudflare Proxy (Flexible mode)
- **AI:** Cloudflare Workers AI REST API (opsiyonel)
- **Email:** Resend API
- **CAPTCHA:** Cloudflare Turnstile
