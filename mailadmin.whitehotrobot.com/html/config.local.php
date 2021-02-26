<?php
$CONF['configured'] = true;

$CONF['postfix_admin_url'] = 'https://mailadmin.whitehotrobot.com';

// Database connection details.
$CONF['database_type'] = 'mysqli';
$CONF['database_host'] = 'localhost';
$CONF['database_user'] = 'mail';
$CONF['database_password'] = '';
$CONF['database_name'] = 'mail';
$CONF['setup_password'] = '37b49d9f179bb2187ea96134c7822d82:219c2a6f043b1a5949b33b6663ba21d02174660c';

$CONF['admin_email'] = 'admin@whitehotrobot.com';

$CONF['smtp_server'] = 'localhost';
$CONF['smtp_port'] = '25';

$CONF['encrypt'] = 'md5crypt';

$CONF['default_aliases'] = [
  'abuse' => 'admin@whitehotrobot.com',
  'hostmaster' => 'admin@whitehotrobot.com',
  'postmaster' => 'admin@whitehotrobot.com',
  'webmaster' => 'admin@whitehotrobot.com'
];

$CONF['show_footer_text'] = 'YES';
$CONF['footer_text'] = 'Return to whitehotrobot.com';
$CONF['footer_link'] = 'https://www.whitehotrobot.com';


$CONF['domain_path'] = 'NO';
$CONF['domain_in_mailbox'] = 'YES';
$CONF['create_mailbox_subdirs_prefix']='';
$CONF['page_size'] = '1000';

