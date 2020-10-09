<?
  $baseDomain = 'local.whitehotrobot.com';
  $contents = file_get_contents('/home/cantelope/hosting/default_vhost.conf');
  $contents = str_replace('[===server_name===]', $argv[1] . '.' . $baseDomain, $contents);
  $contents = str_replace('[===document_root===]', $argv[2], $contents);
  file_put_contents('/etc/apache2/sites-available/' . $argv[1] . '.' . $baseDomain . '.conf', $contents);

  $landing_page = file_get_contents('/sftpusers/hosting_chroot/'.$argv[1].'/www/html/index.php');
  //$landing_page = str_replace('[===user_text===]', $argv[1] . '\'s landing page', $landing_page);
  //$landing_page = str_replace('[===username===]', $argv[1], $landing_page);
  file_put_contents('/sftpusers/hosting_chroot/'.$argv[1].'/www/html/index.php', $landing_page);
  require('/home/cantelope/hosting/db.php');
  $escaped_name = mysqli_real_escape_string($link, $argv[1]);
  $sql='UPDATE users SET has_hosting = TRUE where escaped_name LIKE "' . $escaped_name . '"';
  mysqli_query($link, $sql);
?>
