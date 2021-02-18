<?
  require('db.php');
  $data = json_decode(file_get_contents('php://input'));
  $userID = mysqli_real_escape_string($link, $data->{'userID'});
  $sql='SELECT * FROM users WHERE id = ' . $userID;
  $res = mysqli_query($link, $sql);
  $row=mysqli_fetch_assoc($res);
  echo json_encode(['name'=>$row['name'], 'avatar'=>$row['avatar']]);
?>
