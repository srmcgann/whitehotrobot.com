<?
  require('db.php');
  $data = json_decode(file_get_contents('php://input'));
  $trackID = mysqli_real_escape_string($link, $data->{'trackID'});
  $userName = mysqli_real_escape_string($link, $data->{'userName'});
  $passhash = mysqli_real_escape_string($link, $data->{'passhash'});
  $sql = 'SELECT * FROM users WHERE name LIKE "' . $userName . '" AND passhash = "'.$passhash.'"';
  $res = mysqli_query($link, $sql);
  if(mysqli_num_rows($res)){
    $sql = 'SELECT * FROM audiocloudTracks WHERE id = ' . $trackID;
    $res = mysqli_query($link, $sql);
    $row = mysqli_fetch_assoc($res);
    $playlistIDs = json_decode($row['playlists']);
    forEach($playlistIDs as $id){
      $sql = 'SELECT trackIDs FROM audiocloudPlaylists WHERE id = ' . $id;
      $res2 = mysqli_query($link, $sql);
      $row2 = mysqli_fetch_assoc($res2);
      $trackIDs = json_decode($row2['trackIDs']);
      $newIDs = [];
      forEach($trackIDs as $tid){
        if($tid != $trackID) $newIDs[] = (int)$tid;
      }
      $sql = 'UPDATE audiocloudPlaylists SET trackIDs = "' . str_replace('"', '', json_encode($newIDs)) . '" WHERE id = ' . $id;
      mysqli_query($link, $sql);
    }
    $sql1=$sql = 'DELETE FROM audiocloudComments WHERE trackID = ' . $trackID;
    mysqli_query($link, $sql);
    $sql = 'DELETE FROM audiocloudTracks where id = ' . $trackID;
    mysqli_query($link, $sql);
  }
  echo json_encode($sql1);
?>
