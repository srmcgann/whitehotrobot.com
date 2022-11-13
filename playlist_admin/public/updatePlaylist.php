<?
  require('db.php');

  $playlist = json_decode(file_get_contents('php://input'));

  if($playlistID = $playlist->{'id'}){
    unset($playlist->{'selected'});
    $sql = 'BEGIN;';
    $sql .= 'USE ' . $playlist_db_name . ';';
    foreach($playlist as $key=>$val){
      $key = mysqli_real_escape_string($link, $key);
      $val = mysqli_real_escape_string($link, $val);
      $sql .= 'UPDATE playlists SET `' . $key . '` = "' . $val . '" WHERE id = ' . $playlistID . ';';
    }
    $sql .= 'COMMIT;';
    mysqli_multi_query($link, $sql);
    echo json_encode($sql);
  } else {
    echo json_encode(false);
  }
?>
