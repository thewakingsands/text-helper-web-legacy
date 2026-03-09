FROM node:25.8.0 AS build
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g "$(node -p 'require("./package.json").packageManager')" && \
  pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM nginx:1.15.9
COPY nginx-site.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /www
