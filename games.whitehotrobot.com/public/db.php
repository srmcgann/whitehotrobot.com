<?
  $db_user="user";
  $db_pass=explode("\n", file_get_contents('/home/cantelope/plorgpw'))[0];
  $db_host="localhost";
  $db="videodemos";
  $maxResultsPerPage = 10;
  
  
  $local = true;
  if($local){
    $baseURL='local.games.dweet.net';
    $baseAssetsURL = 'http://local.assets.dweet.net';
  }else{
    $baseURL='games.dweet.net';
    $baseAssetsURL = 'https://assets.dweet.net';
  }
  
  $baseFullURL= ($local ? 'http://' : 'https://') . $baseURL;
  $link = mysqli_connect($db_host, $db_user, $db_pass, $db);

  $in = explode("\n", file_get_contents('/etc/group'));
  foreach($in as $group){
    $group = mysqli_real_escape_string($link, explode(':', $group)[0]);
    $sql = 'SELECT * FROM users WHERE name LIKE "' . $group . '"';
    $res = mysqli_query($link, $sql);
    if(!mysqli_num_rows($res)){
      $sql = 'INSERT INTO users (name, passhash, enabled, escaped_name) VALUES("'.$group.'", "", FALSE, "'.$group.'")';
      mysqli_query($link, $sql);
    }
  }
?>

