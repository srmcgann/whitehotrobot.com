<?
  require('db.php');
  $data = json_decode(file_get_contents('php://input'));
  $pageID = mysqli_real_escape_string($link, $data->{'pageID'});
  $sql='SELECT * FROM pages WHERE id = ' . $pageID;
	$res=mysqli_query($link, $sql);
	$ret = [];
	if(mysqli_num_rows($res)){
	  $ret = mysqli_fetch_assoc($res);
	}
	echo json_encode($ret);
?>
