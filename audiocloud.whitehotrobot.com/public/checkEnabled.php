<?
  require('db.php');
  $data = json_decode(file_get_contents('php://input'));
  $userName = mysqli_real_escape_string($link, $data->{'userName'});
  $passhash = mysqli_real_escape_string($link, $data->{'passhash'});
  $sql = 'SELECT * FROM users WHERE name LIKE "' . $userName . '" AND passhash LIKE "'.$passhash.'";';
  $res = mysqli_query($link, $sql);
  if(mysqli_num_rows($res)){
    $row = mysqli_fetch_assoc($res);
    echo json_encode([
      $row['enabled'],
      $row['id'],
      $row['avatar'],
      $row['admin'],
      $row['audiocloudNumTracksPerPage'],
      $row['audiocloudPlayAll'],
      $row['audiocloudShuffle'],
      $row['audiocloudDisco']
    ]);
  } else {
    echo json_encode([false,'']);
  }
?>
