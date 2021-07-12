<?
  $db_user="user";
  $db_pass="chrome57253";
  $db_host="localhost";
  $db="videodemos";
  $maxResultsPerPage = 4;

	$local = false;
	if($local){
		$baseURL='local.code.whitehotrobot.com';
    $baseProtocol = 'http';
		$demoSandbox='local.demo.whitehotrobot.com';
    $baseAssetsURL = 'http://local.assets.whitehotrobot.com';
  }else{
		$baseURL='code.whitehotrobot.com';
    $baseProtocol = 'https';
		$demoSandbox='demo.whitehotrobot.com';
    $baseAssetsURL = 'https://assets.whitehotrobot.com';
	}

	$baseFullURL= ($local ? 'http://' : 'https://') . $baseURL;
	$link = mysqli_connect($db_host, $db_user, $db_pass, $db);
?>


