<?
  $db_user="user";
  $db_pass="";
  $db_host="localhost";
  $db="videodemos";
  $maxResultsPerPage = 4;

  $local = false;
  if($local){
    $baseURL='local.console.whitehotrobot.com';
    $baseProtocol = 'http';
    $demoSandbox='local.consoledemo.whitehotrobot.com';
    $baseAssetsURL = 'http://local.assets.whitehotrobot.com';
  }else{
    $baseURL='console.whitehotrobot.com';
    $baseProtocol = 'https';
    $demoSandbox='consoledemo.whitehotrobot.com';
    $baseAssetsURL = 'https://assets.whitehotrobot.com';
  }

  $baseFullURL= ($local ? 'http://' : 'https://') . $baseURL;
  $link = mysqli_connect($db_host, $db_user, $db_pass, $db);
?>


