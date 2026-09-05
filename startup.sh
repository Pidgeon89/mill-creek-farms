#!/bin/sh
set -eu
cd /workspace
# Test Stripe keys live outside the repo snapshot when present.
if [ -f /tmp/mcf-stripe.env ]; then
  # shellcheck disable=SC1091
  set -a
  . /tmp/mcf-stripe.env
  set +a
fi
node scripts/preview.mjs stop || true
if curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/; then
  exit 0
fi
npm run dev >>/tmp/app-startup.log 2>&1 &
