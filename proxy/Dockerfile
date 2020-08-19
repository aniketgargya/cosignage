FROM nginx:1.19.2-alpine-perl

RUN apk add inotify-tools openssl

COPY nginx.conf /etc/nginx/nginx.conf

COPY entrypoint.sh entrypoint.sh

CMD ["sh", "entrypoint.sh"]
