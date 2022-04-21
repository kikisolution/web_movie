echo "Deploy script started."
cd /home/ubuntu/data/www/apis/staging/movies
git pull origin master
composer install --no-dev --optimize-autoloader
exit
echo "Deply finished execution."