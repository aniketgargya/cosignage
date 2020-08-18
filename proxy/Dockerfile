FROM nginx:1.19.2-alpine

RUN apk add inotify-tools openssl

COPY default.conf /etc/nginx/conf.d/default.conf

COPY entrypoint.sh entrypoint.sh

CMD ["sh", "entrypoint.sh"]
