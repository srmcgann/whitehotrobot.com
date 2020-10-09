<?
  require('db.php');
  $data = json_decode(file_get_contents('php://input'));
  $userName = mysqli_real_escape_string($link, $data->{'userName'});
  $password = mysqli_real_escape_string($link, $data->{'password'});
  $escaped_name = escapeshellarg(str_replace(' ', '_', str_replace("\t", '_', str_replace(';', '', str_replace("\n", '', $userName)))));
  $userName = str_replace(' ', '_', str_replace("\t", '_', $userName));

  $available=str_replace(chr(10),'',file_get_contents('http://' . $baseURL . "/checkUserNameAvailability.php?userName=".$userName))==="true";
  if($available && $password){
    $hash = password_hash($password, PASSWORD_DEFAULT);
    $sql = 'INSERT INTO users (name, escaped_name, passhash, avatar) VALUES("'.$userName.'", "'.$escaped_name.'", "'.$hash.'","");';
    mysqli_query($link, $sql);
    echo json_encode([true, $hash, mysqli_insert_id($link), $sql]);
  }else{
    echo json_encode(['http://' . $baseURL . "/checkUserNameAvailability.php?userName=".$userName,'username unavailable or password not provided!']);
  }
?>
