if [ ! -f /etc/letsencrypt/live/encrypt2.omnistacks.com/privkey.pem ];
then
    echo "Generating dummy certificates"
    mkdir -p /etc/letsencrypt/certificates/c
    openssl genrsa -out /etc/letsencrypt/certificates/c/privkey.pem 4096
    openssl req -new -key /etc/letsencrypt/certificates/c/privkey.pem  -out /etc/letsencrypt/certificates/c/cert.csr -nodes -subj "/C=PT/ST=World/L=World/O=encrypt2.omnistacks.com/OU=ilhicas lda/CN=encrypt2.omnistacks.com/EMAIL=gargya.aniket@gmail.com"
    openssl x509 -req -days 365 -in /etc/letsencrypt/certificates/c/cert.csr -signkey /etc/letsencrypt/certificates/c/privkey.pem -out /etc/letsencrypt/certificates/c/fullchain.pem
fi

$(while inotifywait -e close_write /etc/letsencrypt/certificates/c; do nginx -s reload; done) &
nginx -g "daemon off;"
