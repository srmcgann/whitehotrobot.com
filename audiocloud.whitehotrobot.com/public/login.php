<?
  require('db.php');
  $data = json_decode(file_get_contents('php://input'));
  $userName = mysqli_real_escape_string($link, $data->{'userName'});
  $password = mysqli_real_escape_string($link, $data->{'password'});
  $sql = 'SELECT * FROM users WHERE name LIKE "' . $userName . '";';
  $res = mysqli_query($link, $sql);
  if(mysqli_num_rows($res)){
    $row = mysqli_fetch_assoc($res);
    echo json_encode([$row['enabled'] && password_verify($password, $row['passhash']), $row['passhash'], $row['id'], $row['avatar'], $row['admin'], $row['audiocloudPlayAll'], $row['audiocloudShuffle'], $row['audiocloudDisco']]);
  } else {
    echo json_encode([false, '', '']);
  }
?>
