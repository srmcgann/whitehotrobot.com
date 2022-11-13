<?
  $db_user="user";
  $db_pass="";
  $db_host="localhost";
  $db="videodemos";

  $local = false;
  if($local){
    $baseURL='local.whitehotrobot.com';
  }else{
    $baseURL='whitehotrobot.com';
  }

  $link = mysqli_connect($db_host, $db_user, $db_pass, $db);
?>


