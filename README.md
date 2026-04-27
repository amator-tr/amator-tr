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
├── scripts/
│   ├── backup.js           # SQLite backup (son 30 gun)
│   ├── setup-cron.sh       # Gunluk backup cron kurulumu
│   └── auto-push.sh        # Degisiklik varsa GitHub'a push
└── deploy.sh               # Pull + rebuild + CF cache purge
```

## Sifirdan Kurulum

### 1. Klonla

```bash
git clone git@github.com:amator-tr/amator-tr.git
cd amator-tr
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
| `CLOUDFLARE_API_TOKEN` | CF API token (AI + cache purge icin, opsiyonel) |
| `CLOUDFLARE_ZONE_ID` | CF dashboard > zone overview (deploy.sh cache purge icin, opsiyonel) |

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
rsync -avz --delete public/ user@sunucu:~/amator-tr/public/
docker compose restart web
```

## Deploy

Sunucuda yeni commit'leri canliya almak icin:

```bash
bash deploy.sh
```

Script sirasiyla:

1. `.env`'i yukler
2. `git pull --ff-only` — yeni commit yoksa cikar (no-op)
3. `docker compose up -d --build --remove-orphans` — degisen container'lari recreate eder
4. `CLOUDFLARE_ZONE_ID` ve `CLOUDFLARE_API_TOKEN` tanimliysa CF cache'i temizler (yoksa uyari verip atlar)

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
- **AI:** Cloudflare Workers AI via ai-proxy worker (opsiyonel)
- **Email:** Resend API
- **CAPTCHA:** Cloudflare Turnstile

## AI Proxy Worker

AI ozellikleri (moderasyon, asistan, mors kelime uretimi) icin ayri bir CF Worker kullanilir.
Worker sadece sunucu IP'sinden gelen isteklere cevap verir, diger IP'lere 404 doner.
Token/API key gerektirmez.

**Repo:** `github.com/amator-tr/ai-proxy`

### Kurulum

```bash
git clone git@github.com:amator-tr/ai-proxy.git
cd ai-proxy
npm install
```

### Yapilandirma

`wrangler.toml` icindeki `ALLOWED_IPS`'e sunucu IP'lerini ekle (IPv4 ve IPv6, virgul ile):

```toml
[vars]
ALLOWED_IPS = "SUNUCU_IPV4,SUNUCU_IPV6"
```

Sunucunun dis IP'lerini bulmak icin:
```bash
curl -4 ifconfig.me    # IPv4
curl -6 ifconfig.me    # IPv6
```

### Deploy

```bash
npx wrangler deploy
```

Worker URL'i (ornek: `https://AI_PROXY_WORKER_URL`) otomatik olarak `src/ai.js` icinde tanimli.
Sunucu IP degisirse `wrangler.toml`'u guncelleyip tekrar deploy et.

### Test

```bash
# Disaridan (404 donmeli)
curl -X POST https://AI_PROXY_WORKER_URL/@cf/meta/llama-3.1-8b-instruct \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"test"}],"max_tokens":5}'

# Sunucudan (cevap donmeli)
ssh user@sunucu "curl -X POST https://AI_PROXY_WORKER_URL/@cf/meta/llama-3.1-8b-instruct \
  -H 'Content-Type: application/json' \
  -d '{\"messages\":[{\"role\":\"user\",\"content\":\"Merhaba\"}],\"max_tokens\":10}'"
```
