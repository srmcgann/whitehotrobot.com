<?
  $db_user="user";
  $db_pass=explode("\n", file_get_contents('/home/cantelope/plorgpw'))[0];
  $db_host="localhost";
  $db="videodemos";
  $demoSandbox='demo.dweet.net';
  $maxResultsPerPage = 6;
  
  
  $local = false;
  if($local){
    $baseURL='local.audiocloud.dweet.net';
    $baseAssetsURL = 'http://local.assets.whitehotrobot.com';
  }else{
    $baseURL='audiocloud.dweet.net';
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

