<?
  require('db.php');
  $data = json_decode(file_get_contents('php://input'));
  $gameID = mysqli_real_escape_string($link, $data->{'gameID'});
  $sql = 'UPDATE games SET playing = TRUE WHERE id = ' . $gameID;
  mysqli_query($link, $sql);
  echo json_encode(['started game# ' . $gameID]);
?>
