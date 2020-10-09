<?
  require('db.php');
	$sql='USE '.$db;
	mysqli_query($link, $sql);
	$sql='SELECT id, name FROM users';
  $res = mysqli_query($link, $sql);
	$users=[];
	for($i=0;$i<mysqli_num_rows($res);++$i){
		$users[]=mysqli_fetch_assoc($res);
	}
  echo json_encode($users);
?>
