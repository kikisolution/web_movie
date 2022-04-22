echo "Deploy staging script started."
cd /home/ubuntu/data/www/web/staging/movies
git pull origin master
composer install --no-dev --optimize-autoloader
exit
echo "Deply staging finished execution."