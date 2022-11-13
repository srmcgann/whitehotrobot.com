<?
  require('db.php');
  $data = json_decode(file_get_contents('php://input'));
  $playlist_name = mysqli_real_escape_string($link, $data->{'playlist_name'});

  $sql = 'SELECT * FROM playlists WHERE playlist_name = ' . $playlist_name;
  $res = mysqli_query($link, $sql);
  if($res){
    echo json_encode(mysqli_fetch_assoc($res));
  } else {
    echo json_encode();
  }
?>
