<?
  require('db.php');
  $data = json_decode(file_get_contents('php://input'));
  $userName = mysqli_real_escape_string($link, $data->{'userName'});
  $passhash = mysqli_real_escape_string($link, $data->{'passhash'});
  $sql = 'SELECT * FROM users WHERE name LIKE "' . $userName . '" AND passhash = "'.$passhash.'";';
  $res = mysqli_query($link, $sql);
  $success = false;
  if(mysqli_num_rows($res)){
    $row = mysqli_fetch_assoc($res);
    if($row['enabled']){
      $userID = $row['id'];
      $sql = 'INSERT INTO items (videoLink, demoJS, demoCSS, demoHTML, title, userID, author, forkHistory) VALUES("","","","","",'.$userID.',"'.$userName.'", "")';
      mysqli_query($link, $sql);
      $success = true;
    }
  }
  
  echo json_encode([$success, mysqli_insert_id($link), $sql]);

?>
