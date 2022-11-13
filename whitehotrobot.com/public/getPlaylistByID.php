<?
  require('db.php');
  $data = json_decode(file_get_contents('php://input'));
  $playlistID = mysqli_real_escape_string($link, $data->{'playlistID'});

  $sql = 'SELECT * FROM playlists WHERE id = ' . $playlistID;
  $res = mysqli_query($link, $sql);
  if($res){
    echo json_encode(mysqli_fetch_assoc($res));
  } else {
    echo json_encode();
  }
?>
