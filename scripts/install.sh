#!/bin/bash
# AfterInstall hook — install backend Node.js dependencies

set -e

APP_DIR="/home/ec2-user/demo-app"

echo "Running npm install in backend..."
cd "$APP_DIR/backend"
npm install

echo "Install complete."
