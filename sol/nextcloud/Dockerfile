FROM nextcloud:latest

RUN apt update && apt install --no-install-recommends -y cron \
    && rm -rf /var/lib/apt/lists/* && apt clean

RUN echo "*/5 * * * * php -f /var/www/html/cron.php" | crontab -u www-data -