<?
  require('db.php');
  if(!($userName = mysqli_real_escape_string($link, $_GET['userName']))){
    $data = json_decode(file_get_contents('php://input'));
    $userName = mysqli_real_escape_string($link, $data->{'userName'});
  }
  $sql='SELECT * FROM users WHERE name LIKE "'.$userName.'"';
  $res = mysqli_query($link, $sql);
  echo json_encode(mysqli_num_rows($res) === 0);
?>
