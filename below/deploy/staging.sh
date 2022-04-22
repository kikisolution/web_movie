echo "Deploy staging script started."
cd ../../
git pull origin master
composer install --no-dev --optimize-autoloader
exit
echo "Deply staging finished execution."