echo "Deploy script started."
cd /home/ubuntu/data/www/apis/production/movies
git pull origin master
composer install --no-dev --optimize-autoloader
exit
echo "Deply finished execution."