#!/usr/bin/env bash
set -euo pipefail

# .env'den sadece Cloudflare cache purge için gerekli değişkenleri oku.
# Tüm dosyayı source etmiyoruz çünkü EMAIL_FROM gibi `<>` içeren değerler
# bash'te syntax hatası verir.
read_env() {
  local key="$1"
  [ -f .env ] || return 0
  local line
  line=$(grep -E "^${key}=" .env | tail -n1) || true
  [ -z "$line" ] && return 0
  local val="${line#*=}"
  # Çevreleyen tırnakları soy
  val="${val%\"}"; val="${val#\"}"
  val="${val%\'}"; val="${val#\'}"
  printf '%s' "$val"
}

CLOUDFLARE_ZONE_ID=$(read_env CLOUDFLARE_ZONE_ID)
CLOUDFLARE_API_TOKEN=$(read_env CLOUDFLARE_API_TOKEN)

echo "Git pull..."
BEFORE=$(git rev-parse HEAD)
git pull --ff-only
AFTER=$(git rev-parse HEAD)

if [ "$BEFORE" = "$AFTER" ]; then
  echo "Yeni commit yok — compose up (env_file değişiklikleri için recreate)."
  docker compose up -d --remove-orphans
  echo "Tamamlandı."
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
