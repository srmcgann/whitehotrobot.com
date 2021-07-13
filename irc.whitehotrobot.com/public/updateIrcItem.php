<?
  require('db.php');
  $data = json_decode(file_get_contents('php://input'));
  $userName = mysqli_real_escape_string($link, $data->{'userName'});
  $passhash = mysqli_real_escape_string($link, $data->{'passhash'});
	$item = mysqli_real_escape_string($link, $data->{'item'});
  $newItemVal = mysqli_real_escape_string($link, $data->{'newItemVal'});
  $ircID = mysqli_real_escape_string($link, $data->{'ircID'});
  $sql = 'SELECT * FROM users WHERE name LIKE "'.$userName.'" AND passhash = "'.$passhash.'";';
  $res = mysqli_query($link, $sql);
  $success = false;
  if(mysqli_num_rows($res)){
    $row = mysqli_fetch_assoc($res);
    if($row['enabled']){
      if($row['admin']){
        $sql = 'UPDATE irc SET '.$item.' = "'.$newItemVal.'" WHERE id = '.$ircID;
      } else {
        $sql = 'UPDATE irc SET '.$item.' = "'.$newItemVal.'" WHERE id = '.$ircID . ' AND userID = ' . $row['id'];
      }
      mysqli_query($link, $sql);
      $success = true;
    }
  }
  echo json_encode([$success,$sql]);
?>
