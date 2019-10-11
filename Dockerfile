FROM node:lts
ADD . /app
WORKDIR /app
RUN yarn && \
  yarn build

FROM nginx:1.15.9
COPY nginx-site.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /app/dist /www
