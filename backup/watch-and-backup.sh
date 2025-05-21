#!/bin/sh

WATCH_DIR="/data"
REPO="/repo"

export RESTIC_PASSWORD="$RESTIC_PASSWORD"

# --- 자동 init ---
if [ ! -f "$REPO/config" ]; then
  echo "Restic repository not found at $REPO"
  echo "Initializing restic repository..."
  restic -r "$REPO" init
  echo "Initialization complete."
else
  echo "Restic repository already exists."
fi

# --- 변경 감시 루프 ---
echo "Watching $WATCH_DIR for changes..."

while inotifywait -r -e modify,create,delete,move "$WATCH_DIR"; do
    echo "Change detected. Running backup..."
    restic -r "$REPO" backup "$WATCH_DIR"
    echo "Backup done."
done
