<?
  require('db.php');
  $data = json_decode(file_get_contents('php://input'));
  $escaped_name = mysqli_real_escape_string($link, $data->{'escaped_name'});
  $sql='SELECT * FROM users WHERE escaped_name = "' . $escaped_name . '"';
  $res = mysqli_query($link, $sql);
  $row=mysqli_fetch_assoc($res);
	unset($row['passhash']);
	$ret = $row;
	$sql="SELECT * FROM pages WHERE userID = " . $row['id'] . ' ORDER BY id DESC';
	$res = mysqli_query($link, $sql);
	$pages = [];
	for($i=0;$i<mysqli_num_rows($res);++$i){
		$row = mysqli_fetch_assoc($res);
		$pages[]=$row;
	}
	$ret['pages'] = $pages;
  echo json_encode($ret);
?>
