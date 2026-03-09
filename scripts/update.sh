#!/bin/bash
set -e
echo "Installing packages ..."
docker run -it --rm -v `pwd`:/app -v pnpmstore:/pnpm/store -w /app node:lts sh -lc "corepack enable && pnpm install --frozen-lockfile --store-dir /pnpm/store"
echo "Buliding ..."
docker run -it --rm -v `pwd`:/app -v pnpmstore:/pnpm/store -w /app node:lts sh -lc "corepack enable && pnpm --store-dir /pnpm/store build"
