<?
  require('db.php');
	$sql = 'USE ' . $db;
	mysqli_query($link, $sql);
	$sql = 'SELECT * FROM items ORDER BY id DESC'; 
	$res = mysqli_query($link, $sql);
	$videos = [];
	for($i=0;$i<mysqli_num_rows($res);++$i){
		$row = mysqli_fetch_assoc($res);
		unset($row['demoHTML']);
    unset($row['demoCSS']);
    unset($row['demoJS']);
    if($row['videoLink']) $videos[] = $row;
	}
  echo json_encode($videos);
?>
