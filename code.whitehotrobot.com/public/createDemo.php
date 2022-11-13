<?
  require('db.php');
  $data = json_decode(file_get_contents('php://input'));
  $userName = mysqli_real_escape_string($link, $data->{'userName'});
  $passhash = mysqli_real_escape_string($link, $data->{'passhash'});
  $sql = 'SELECT * FROM users WHERE name LIKE "' . $userName . '" AND passhash = "'.$passhash.'"';
  $res = mysqli_query($link, $sql);
  $success = false;
  if(mysqli_num_rows($res)){
    $row = mysqli_fetch_assoc($res);
    $userID = $row['id'];
    $sql = 'INSERT INTO items (videoLink, demoJS, demoCSS, demoHTML, private, title, userID, author, forkHistory) VALUES("","","","", 1, "",'.$userID.',"'.$userName.'", "")';;
    mysqli_query($link, $sql);
    $insert_id = mysqli_insert_id($link);
    $success = true;
  }
  if($success){
    echo json_encode([1, $insert_id, $sql]);
  }else{
    echo json_encode([0, $sql]);
  }
?>
