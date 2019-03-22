#!/bin/bash
docker run -it --rm -v `pwd`:/app -w /app node:lts yarn
docker run -it --rm -v `pwd`:/app -w /app node:lts yarn build
docker run -it --rm -v `pwd`:/app --entrypoint=/usr/bin/rsync eeacms/rsync -a --delete /app/build/ /app/dist/
