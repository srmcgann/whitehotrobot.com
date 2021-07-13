<?
  require('db.php');
  $data = json_decode(file_get_contents('php://input'));
  $ircHTML = mysqli_real_escape_string($link, $data->{'ircHTML'});
  $ircCSS = mysqli_real_escape_string($link, $data->{'ircCSS'});
  $ircJS = mysqli_real_escape_string($link, $data->{'ircJS'});
  $userName = mysqli_real_escape_string($link, $data->{'userName'});
  $passhash = mysqli_real_escape_string($link, $data->{'passhash'});
  $ircID = mysqli_real_escape_string($link, $data->{'ircID'});
  $sql = 'SELECT * FROM users WHERE name LIKE "' . $userName . '" AND passhash = "'.$passhash.'";';
  $res = mysqli_query($link, $sql);
  $success = false;
  if(mysqli_num_rows($res)){
    $row = mysqli_fetch_assoc($res);
    if($row['enabled']){
      if($row['admin']){
        $sql = 'UPDATE irc SET ircHTML = "'.$ircHTML.'", ircCSS = "'.$ircCSS.'", ircJS = "'.$ircJS.'" WHERE id = '.$ircID;
      } else {
        $sql = 'UPDATE irc SET ircHTML = "'.$ircHTML.'", ircCSS = "'.$ircCSS.'", ircJS = "'.$ircJS.'" WHERE id = '.$ircID . ' AND userID = ' . $row['id'];
      }
      mysqli_query($link, $sql);
      $success = true;
    }
  }
  echo json_encode([$success]);
?>
