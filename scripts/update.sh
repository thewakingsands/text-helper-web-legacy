#!/bin/bash
set -e
echo "Installing packages ..."
docker run -it --rm -v `pwd`:/app -v yarncache:/root/.yarn-cache -w /app node:lts yarn
echo "Buliding ..."
docker run -it --rm -v `pwd`:/app -w /app node:lts yarn build
echo "Updating directory ..."
docker run -it --rm -v `pwd`:/app --entrypoint=/usr/bin/rsync eeacms/rsync -a --delete /app/build/ /app/dist/
