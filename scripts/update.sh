#!/bin/bash
set -e

PNPM_PACKAGE=$(node -p "require('./package.json').packageManager")
echo "Installing packages ..."
docker run -it --rm -v `pwd`:/app -v pnpmstore:/pnpm/store -w /app node:lts sh -lc "npm install -g '$PNPM_PACKAGE' && pnpm install --frozen-lockfile --store-dir /pnpm/store"
echo "Buliding ..."
docker run -it --rm -v `pwd`:/app -v pnpmstore:/pnpm/store -w /app node:lts sh -lc "npm install -g '$PNPM_PACKAGE' && pnpm --store-dir /pnpm/store build"
