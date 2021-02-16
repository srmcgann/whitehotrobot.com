<?
  $db_user="user";
  $db_pass="";
  $db_host="localhost";
  $db="videodemos";
  $maxResultsPerPage = 2;
  
  
	$local = false;
	if($local){
		$baseURL='local.words.whitehotrobot.com';
    $baseAssetsURL = 'http://local.assets.whitehotrobot.com';
  }else{
		$baseURL='words.whitehotrobot.com';
    $baseAssetsURL = 'https://assets.whitehotrobot.com';
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

