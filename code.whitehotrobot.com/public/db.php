<?
  $db_user="user";
  $db_pass="";
  $db_host="localhost";
  $db="videodemos";
  $maxResultsPerPage = 2;

	$local = false;
	if($local){
		$baseURL='local.code.whitehotrobot.com';
		$demoSandbox='local.demo.whitehotrobot.com';
    $baseAssetsURL = 'http://local.assets.whitehotrobot.com';
  }else{
		$baseURL='words.whitehotrobot.com';
		$demoSandbox='demo.whitehotrobot.com';
    $baseAssetsURL = 'https://assets.whitehotrobot.com';
	}

	$baseFullURL= ($local ? 'http://' : 'https://') . $baseURL;
	$link = mysqli_connect($db_host, $db_user, $db_pass, $db);
?>


