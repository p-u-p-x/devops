#!/bin/bash
# ApplicationStart hook — start the backend server in the background

set -e

APP_DIR="/home/ec2-user/demo-app"
LOG_FILE="$APP_DIR/backend/server.log"

echo "Starting demo-app backend server..."
cd "$APP_DIR/backend"

nohup node server.js > "$LOG_FILE" 2>&1 &

echo "Server started. Logs: $LOG_FILE"
