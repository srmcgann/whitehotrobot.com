#!/bin/bash
mkdir /var/www/html/code.whitehotrobot.com/dist_public
cp /var/www/html/code.whitehotrobot.com/dist/. /var/www/html/code.whitehotrobot.com/dist_public/ -r
chgrp www-data /var/www/html/code.whitehotrobot.com/dist_public/thumbs -R
