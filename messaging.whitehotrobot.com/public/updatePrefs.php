<?
  require('db.php');
  $data = json_decode(file_get_contents('php://input'));
  $userName = mysqli_real_escape_string($link, $data->{'userName'});
  $passhash = mysqli_real_escape_string($link, $data->{'passhash'});
  $pref = mysqli_real_escape_string($link, $data->{'pref'});
  $newval = mysqli_real_escape_string($link, $data->{'newval'});
  $success = false;
  $sql = 'SELECT * FROM users WHERE name LIKE "'.$userName.'" AND passhash = "'.$passhash.'"';
  $res = mysqli_query($link, $sql);
  if(mysqli_num_rows($res)){
    $row = mysqli_fetch_assoc($res);
    if($row['enabled']){
      $sql = 'UPDATE users SET ' . $pref . ' = ' . $newval . ' WHERE name LIKE "'.$userName.'"';
      mysqli_query($link, $sql);
      $success = true;
    }
  }
  echo json_encode([$success,$sql,$userName]);
?>
