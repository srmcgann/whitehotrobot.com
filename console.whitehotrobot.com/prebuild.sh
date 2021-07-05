#!/bin/bash
#rm -rf /var/www/html/code.whitehotrobot.com/thumbs
mkdir /var/www/html/console.whitehotrobot.com/thumbs
cp /var/www/html/console.whitehotrobot.com/dist/thumbs/. /var/www/html/console.whitehotrobot.com/thumbs -r
cp /var/www/html/console.whitehotrobot.com/dist_public/thumbs/. /var/www/html/console.whitehotrobot.com/thumbs -r
rm ./dist/video
rm ./public/video
