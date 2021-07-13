<?
  $db_user="user";
  $db_pass="";
  $db_host="localhost";
  $db="videodemos";
  $maxResultsPerPage = 4;

	$local = true;
	if($local){
		$baseURL='irc.whitehotrobot.com';
    $baseProtocol = 'http';
		$ircSandbox='local.demo.whitehotrobot.com';
    $baseAssetsURL = 'http://local.assets.whitehotrobot.com';
  }else{
		$baseURL='irc.whitehotrobot.com';
    $baseProtocol = 'https';
    $baseAssetsURL = 'https://assets.whitehotrobot.com';
	}

	$baseFullURL= ($local ? 'http://' : 'https://') . $baseURL;
	$link = mysqli_connect($db_host, $db_user, $db_pass, $db);
?>


