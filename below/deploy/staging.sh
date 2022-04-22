echo "#---Deploy staging script started.---#"
cd /home/ubuntu/data/www/web/staging/movies
echo "#---Git pull origin master"
git pull origin master
composer install --no-dev --optimize-autoloader
npm install
npm run production
exit
echo "Deply staging finished execution."