#!/bin/bash
userdel -f -r $1
#a2dissite $1.whitehotrobot.com
#rm /etc/apache2/sites-available/$1.whitehotrobot.com.conf
#systemctl reload apache2
sudo php /home/cantelope/hosting/unsetbit.php $1
