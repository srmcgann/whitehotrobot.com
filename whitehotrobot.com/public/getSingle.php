<?
  require('db.php');
  $data = json_decode(file_get_contents('php://input'));
  $itemID = mysqli_real_escape_string($link, $data->{'itemID'});

  $sql = 'USE ' . $db;
	mysqli_query($link, $sql);
	$sql = 'SELECT * FROM items WHERE id = '.$itemID.' ORDER BY id DESC'; 
	$res = mysqli_query($link, $sql);
	$videos = [];
	for($i=0;$i<mysqli_num_rows($res);++$i){
		$row = mysqli_fetch_assoc($res);
    unset($row['demoHTML']);
    unset($row['demoCSS']);
    unset($row['demoJS']);
    if($row['videoLink']) $videos[] = $row;
	}
  if(sizeof($videos)){
    echo json_encode($videos);
	} else {
		echo json_encode(false);
	}
?>
