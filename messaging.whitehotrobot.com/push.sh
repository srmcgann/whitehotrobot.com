#!/bin/bash
cd /var/www/html/messaging.whitehotrobot.com
mkdir /var/www/html/messaging.whitehotrobot.com/dist_public
cp /var/www/html/messaging.whitehotrobot.com/dist/. /var/www/html/messaging.whitehotrobot.com/dist_public/. -r
cp /var/www/html/messaging.whitehotrobot.com/dist/.htaccess /var/www/html/messaging.whitehotrobot.com/dist_public/.htaccess
