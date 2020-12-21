<?
  require('db.php');
  $data = json_decode(file_get_contents('php://input'));
  $userName = mysqli_real_escape_string($link, $data->{'userName'});
  $passhash = mysqli_real_escape_string($link, $data->{'passhash'});
  $newAvatar = mysqli_real_escape_string($link, $data->{'newAvatar'});
  $sql = 'SELECT * FROM users WHERE name LIKE "'.$userName.'" AND passhash = "'.$passhash.'"';
  $res = mysqli_query($link, $sql);
  $success = false;
  if(mysqli_num_rows($res)){
    $row = mysqli_fetch_assoc($res);
    if($row['enabled']){
      $sql = 'UPDATE users SET avatar = "'.$newAvatar.'" WHERE name LIKE "'.$userName.'"';
      mysqli_query($link, $sql);
      $success = true;
    }
  }
  echo json_encode([$success,$sql]);
?>
