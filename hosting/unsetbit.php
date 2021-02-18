<?
  require('/home/cantelope/hosting/db.php');
  $escaped_name = mysqli_real_escape_string($link, $argv[1]);
  $sql = 'SELECT * FROM users WHERE escaped_name LIKE "\'' . $escaped_name . '\'"';
  echo $sql;
  $res = mysqli_query($link, $sql);
  if(mysqli_num_rows($res)){
    $row = mysqli_fetch_assoc($res);
    $userID = $row['id'];
    $sql='DELETE FROM users WHERE id = ' . $userID;
    mysqli_query($link, $sql);
    $sql = 'DELETE FROM pages WHERE userID = ' . $userID;
    mysqli_query($link, $sql);
    $sql = 'DELETE FROM items WHERE userID = ' . $userID;
    mysqli_query($link, $sql);
  }
  exec('a2dissite ' . str_replace("'", '', $escaped_name) . '.' . $baseURL);
  exec('rm /etc/apache2/sites-available/' . str_replace("'", '', $escaped_name) . $baseURL . '.conf');
  exec('systemctl reload apache2');
?>
