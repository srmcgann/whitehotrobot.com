<?
  require('db.php');
  $data = json_decode(file_get_contents('php://input'));
  $pageID = mysqli_real_escape_string($link, $data->{'pageID'});
  $userName = mysqli_real_escape_string($link, $data->{'userName'});
  $passhash = mysqli_real_escape_string($link, $data->{'passhash'});
  $ret = false;
  if($userName && $passhash){
    $sql='SELECT * FROM users WHERE name LIKE "' . $userName . '" AND passhash = "' .$passhash. '"';
    if($res = mysqli_query($link, $sql)){
      $row=mysqli_fetch_assoc($res);
			$sql='DELETE FROM pages WHERE id = ' . $pageID . ' AND userID = ' . $row['id'];
      mysqli_query($link, $sql);
			$ret = true;
		}
	}
	echo json_encode($ret);
?>
