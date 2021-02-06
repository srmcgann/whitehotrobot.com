<?
  require('db.php');
  $data = json_decode(file_get_contents('php://input'));
  $userID = mysqli_real_escape_string($link, $data->{'userID'});
  $sql='SELECT * FROM users WHERE id = ' . $userID;
  $res = mysqli_query($link, $sql);
  $row=mysqli_fetch_assoc($res);
	unset($row['passhash']);
	$ret = $row;
	$sql="SELECT * FROM pages WHERE userID = " . $userID . ' ORDER BY id DESC';
	$res = mysqli_query($link, $sql);
	$pages = [];
	for($i=0;$i<mysqli_num_rows($res);++$i){
		$row = mysqli_fetch_assoc($res);
		$pages[]=$row;
	}
	$ret['pages'] = $pages;
  echo json_encode($ret);
?>
