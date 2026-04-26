#!/bin/bash
cd /home/ubuntu/amator-tr || exit 1

if [ -z "$(git status --porcelain)" ]; then
  exit 0
fi

git add -A
git commit -m "auto-backup: $(date '+%Y-%m-%d %H:%M')"
git push origin main
