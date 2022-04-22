echo "Deploy staging script started."
git pull origin master
composer install --no-dev --optimize-autoloader
exit
echo "Deply staging finished execution."