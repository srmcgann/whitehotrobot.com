<?
  $db_user="user";
  $db_pass=explode("\n", file_get_contents('/home/cantelope/plorgpw'))[0];
  $db_host="localhost";
  $db="videodemos";
  $maxResultsPerPage = 4;
  $local = false;
  if($local){
    $baseURL='local.code.dweet.net';
    $baseProtocol = 'http';
    $demoSandbox='local.demo.dweet.net';
    $baseAssetsURL = 'http://local.assets.dweet.net';
  }else{
    $baseURL='code.dweet.net';
    $baseProtocol = 'https';
    $demoSandbox='demo.dweet.net';
    $baseAssetsURL = 'https://assets.dweet.net';
  }

  $baseFullURL= ($local ? 'http://' : 'https://') . $baseURL;
  $link = mysqli_connect($db_host, $db_user, $db_pass, $db);
?>


