FROM python:3.8.5

WORKDIR /app

RUN wget https://dl.eff.org/certbot-auto
RUN mv certbot-auto /usr/local/bin/certbot-auto
RUN chmod 755 /usr/local/bin/certbot-auto

COPY entrypoint.sh entrypoint.sh

CMD ["sh", "entrypoint.sh"]
