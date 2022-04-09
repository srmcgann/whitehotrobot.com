<?
  require('db.php');
  function decToAlpha($val){
    $alphabet="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    $ret="";
    while($val){
      $r=floor($val/62);
      $frac=$val/62-$r;
      $ind=(int)round($frac*62);
      $ret=$alphabet[$ind].$ret;
      $val=$r;
    }
    return $ret==""?"0":$ret;
  }

  function escapeUserName($userName, $id){
    return str_replace('\\', '', str_replace(';', '', str_replace("'", '', escapeshellarg(str_replace(' ', '', str_replace("\t", '', str_replace(';', '', str_replace("\n", '', str_replace('&', '', str_replace('|', '', str_replace('@', '', str_replace('#', '', str_replace('$', '', str_replace('%', '', str_replace('^', '', str_replace('(', '', str_replace(')', '', str_replace('?','', str_replace('!', '', str_replace('_', '', str_replace('`', '', str_replace("'", '', str_replace( '~', '', str_replace('"', '', $userName))))))))))))))))))))))).decToAlpha($id));
  }


  $data = json_decode(file_get_contents('php://input'));
  $userName = mysqli_real_escape_string($link, $data->{'userName'});
  $userName = str_replace(';', '', $userName);
  $password = mysqli_real_escape_string($link, $data->{'password'});

  $available=str_replace(chr(10),'',file_get_contents('http://' . $baseURL . "/checkUserNameAvailability.php?userName=".urlencode($userName)))==="true";
  if($available && $password){
    $hash = password_hash($password, PASSWORD_DEFAULT);
    $sql = 'INSERT INTO users (name, escaped_name, passhash, avatar) VALUES("'.$userName.'", "", "'.$hash.'","");';
    mysqli_query($link, $sql);
    $id = mysqli_insert_id($link);
    $escaped_name = escapeUserName($userName, $id);
    $sql = 'UPDATE users SET escaped_name = "'.$escaped_name.'" WHERE id = ' . $id;
    mysqli_query($link, $sql);
    echo json_encode([true, $hash, mysqli_insert_id($link), $sql]);
  } else {
    echo json_encode([$available,'http://' . $baseURL . "/checkUserNameAvailability.php?userName=".$userName,'username unavailable or password not provided!']);
  }
?>
