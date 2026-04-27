#!/usr/bin/env bash
set -euo pipefail

# .env dosyasını yükle
if [ -f .env ]; then
  set -a
  source .env
  set +a
else
  echo ".env dosyası bulunamadı!"
  exit 1
fi

echo "Git pull..."
BEFORE=$(git rev-parse HEAD)
git pull --ff-only
AFTER=$(git rev-parse HEAD)

if [ "$BEFORE" = "$AFTER" ]; then
  echo "Değişiklik yok — deploy atlanıyor."
  exit 0
fi

echo "Yeni commit'ler:"
git log --oneline "$BEFORE..$AFTER"

echo "Docker compose up (build + recreate)..."
docker compose up -d --remove-orphans --build

if [ -n "${CLOUDFLARE_ZONE_ID:-}" ] && [ -n "${CLOUDFLARE_API_TOKEN:-}" ]; then
  echo "Cloudflare cache temizleniyor..."
  RESPONSE=$(curl -sS --fail-with-body \
    -X POST "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/purge_cache" \
    -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
    -H "Content-Type: application/json" \
    --data '{"purge_everything":true}')
  if echo "$RESPONSE" | grep -q '"success":true'; then
    echo "Cache temizlendi."
  else
    echo "HATA: Cloudflare cache temizlenemedi:"
    echo "$RESPONSE"
    exit 1
  fi
else
  echo "UYARI: CLOUDFLARE_ZONE_ID veya CLOUDFLARE_API_TOKEN .env içinde tanımlı değil — Cloudflare cache temizlenmedi."
fi

echo "Tamamlandı."
