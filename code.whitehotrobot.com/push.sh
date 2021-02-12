#!/bin/bash
mkdir /var/www/html/code.whitehotrobot.com/dist_public
cp /var/www/html/code.whitehotrobot.com/dist/. /var/www/html/code.whitehotrobot.com/dist_public/ -r
#chgrp www-data /var/www/html/code.whitehotrobot.com/dist_public/thumbs -R
chown cantelope:www-data /var/www/html/code.whitehotrobot.com/dist_public/thumbs -R
chmod 777 /var/www/html/code.whitehotrobot.com/dist_public/thumbs -R
