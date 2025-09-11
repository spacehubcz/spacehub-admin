echo off
echo "################# SPACEHUB ADMIN ######################"
echo "https://github.com/spacehubcz/spacehub-admin.git"
echo "#######################################################"
git status
git add .
git status
git commit -m %1
git push origin master
echo "------------------------------------------------"
