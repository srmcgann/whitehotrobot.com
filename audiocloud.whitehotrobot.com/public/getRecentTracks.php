<?
  require('db.php');
	$sql = 'SELECT * FROM audiocloudTracks WHERE private = 0 ORDER BY id DESC LIMIT 50';
	$res = mysqli_query($link, $sql);
	$tracks = [];
	for($i = 0; $i < mysqli_num_rows($res); ++$i){
		$tracks[] = mysqli_fetch_assoc($res);
  }
  forEach($tracks as &$track){
		$trackID = $track['id'];
    $sql = 'SELECT * FROM audiocloudComments WHERE trackID = ' . $trackID;
    $res2 = mysqli_query($link, $sql);
    $track['comments'] = [];
    for($j=0;$j<mysqli_num_rows($res2);++$j){
      $track['comments'][] = mysqli_fetch_assoc($res2);
    }
  }
	echo json_encode($tracks);
?>
