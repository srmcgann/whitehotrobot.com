<?
  $db_user="user";
  $db_pass="";
  $db_host="localhost";
  $db="videodemos";
  $demoSandbox='demo.whitehotrobot.com';
  
	$local = false;
	if($local){
		$baseURL='local.hosting.whitehotrobot.com';
	}else{
		$baseURL='hosting.whitehotrobot.com';
	}
  
	$baseFullURL='https://code.whitehotrobot.com';
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

