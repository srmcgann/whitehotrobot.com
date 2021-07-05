#!/bin/bash
ln -s /var/www/html/whitehotrobot_assets/video /var/www/html/console.whitehotrobot.com/dist/video
ln -s /var/www/html/whitehotrobot_assets/video /var/www/html/console.whitehotrobot.com/public/video
mkdir /var/www/html/console.whitehotrobot.com/dist/thumbs
mkdir /var/www/html/console.whitehotrobot.com/dist_public/thumbs
cp /var/www/html/console.whitehotrobot.com/thumbs/. /var/www/html/console.whitehotrobot.com/dist/thumbs -r
cp /var/www/html/console.whitehotrobot.com/thumbs/. /var/www/html/console.whitehotrobot.com/dist_public/thumbs -r
