#!/bin/bash
# Gunluk gece 3'te backup al
SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
CRON_LINE="0 3 * * * cd $SCRIPT_DIR && docker compose run --rm backup >> $SCRIPT_DIR/data/backup.log 2>&1"
(crontab -l 2>/dev/null | grep -v "cagri.*backup"; echo "$CRON_LINE") | crontab -
echo "Cron job installed: daily backup at 03:00"
