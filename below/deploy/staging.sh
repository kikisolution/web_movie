echo "#---Deploy staging script started.---#"
cd /home/ubuntu/data/www/web/staging/movies

echo "#---Git pull origin master---#"
git pull origin master

echo "#---Composer install --no-dev --optimize-autoloader---#"
composer install --no-dev --optimize-autoloader

echo "#---Npm install---#"
npm install

#npm run production
exit
echo "Deply staging finished execution."