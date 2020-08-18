if [ ! -f /etc/letsencrypt/certificates/c/certbot.txt ];
then
    echo "Requesting certificates"
    /usr/local/bin/certbot-auto certonly \
        -n \
        --agree-tos \
        -m gargya.aniket@gmail.com \
        --noninteractive \
		--webroot \
		--webroot-path /var/www/certbot \
        -d "$DOMAIN"

    mkdir -p /etc/letsencrypt/certificates/c

    cp -r /etc/letsencrypt/live/"$DOMAIN"/* /etc/letsencrypt/certificates/c
    touch /etc/letsencrypt/certificates/c/certbot.txt
fi

while true; do
    echo "Renewing certificates";
    /usr/local/bin/certbot-auto renew;
    cp -r /etc/letsencrypt/live/"$DOMAIN"/* /etc/letsencrypt/certificates/c

    sleep 604800;
done