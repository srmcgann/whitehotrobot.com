<?
  require('db.php');

  $data = json_decode(file_get_contents('php://input'));
  $playlistID = $data->{'playlistID'};
 
  if($playlistID){
		$sql = 'DELETE FROM playlists WHERE id = ' . $playlistID;
		mysqli_query($link, $sql);
	  echo json_encode(true);
	} else {
		echo json_encode(false);
	}
?>
