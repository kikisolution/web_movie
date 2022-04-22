echo "######################################"
echo "#---Deploy staging script started.---#"
echo "######################################"
cd /home/ubuntu/data/www/web/staging/movies

echo "######################################"
echo "#---Git pull origin master---#"
echo "######################################"
git pull origin master

echo "######################################"
echo "#---Composer install --no-dev --optimize-autoloader---#"
echo "######################################"
composer install --no-dev --optimize-autoloader

echo "######################################"
echo "#---Npm install---#"
echo "######################################"
npm install

echo "######################################"
echo "#---Npm run production---#"
echo "######################################"
node --version
npm run production

echo "######################################"
echo "#---Deply staging finished execution.---#"
echo "######################################"
exit

