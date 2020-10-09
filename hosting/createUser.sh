#!/bin/bash
useradd -g hosting -s /bin/bash -m -d /sftpusers/hosting_chroot/$1 -p $(perl -e "print crypt(\"$2\", \"salt\"),\"\n\"") $1
chown root /sftpusers/hosting_chroot/$1
mkdir /sftpusers/hosting_chroot/$1/www
mkdir /sftpusers/hosting_chroot/$1/www/html
cp -r /sftpusers/hosting_chroot/hosting/default_page/. /sftpusers/hosting_chroot/$1/www/html
sudo php /home/cantelope/hosting/install_vhost.php $1 /sftpusers/hosting_chroot/$1/www/html/ $3
chown $1 /sftpusers/hosting_chroot/$1/www -R
a2ensite $1.whitehotrobot.com
systemctl reload apache2
sudo certbot run --apache -n --redirect -d $1.whitehotrobot.com
