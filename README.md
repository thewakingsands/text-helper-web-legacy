# text-helper-web

## Build

```bash
docker run -it --rm -v `pwd`:/app -w /app node:lts yarn
docker run -it --rm -v `pwd`:/app -w /app node:lts yarn build
```

## Run

```bash
systemctl enable --now `pwd`/text-helper-web.service
```
