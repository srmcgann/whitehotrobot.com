<?
  $db_user="user";
  $db_pass="";
  $db_host="localhost";
  $db="videodemos";
  $demoSandbox='demo.whitehotrobot.com';
  
	$local = false;
	if($local){
		$baseURL='local.code.whitehotrobot.com';
	}else{
		$baseURL='code.whitehotrobot.com';
	}
  
	$baseFullURL='https://code.whitehotrobot.com';
	$link = mysqli_connect($db_host, $db_user, $db_pass, $db);
?>

