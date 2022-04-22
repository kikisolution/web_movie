echo "######################################"
echo "#---Deploy staging script started.---#"
echo "######################################"
cd /home/ubuntu/data/www/web/staging/movies

echo "######################################"
echo "#---Git pull origin master---#"
echo "######################################"
git pull origin master

echo "#---Composer install --no-dev --optimize-autoloader---#"
composer install --no-dev --optimize-autoloader

echo "#---Npm install---#"
npm install

echo "#---Npm run production---#"
npm run production

echo "#---Deply staging finished execution.---#"
exit

