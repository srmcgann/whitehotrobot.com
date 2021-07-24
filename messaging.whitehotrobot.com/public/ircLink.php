<?
  error_reporting(E_ALL);
  ini_set('max_execution_time', 0);
  header("Content-Type: text/plain");

  require('db.php');
  $data = json_decode(file_get_contents('php://input'));
  $userName = mysqli_real_escape_string($link, $data->{'userName'});
  $passhash = mysqli_real_escape_string($link, $data->{'passhash'});
  $type = mysqli_real_escape_string($link, $data->{'type'});
  $msg = mysqli_real_escape_string($link, $data->{'msg'});
  $msg = $data->{'msg'};
  $vars = [];

  function ms(){
    return microtime(true)*1000|0;
  }

  function validateUser(){
    global $link, $userName, $passhash, $vars;
    $sql = 'SELECT id, enabled FROM users WHERE name LIKE "'.$userName.'" AND passhash = "'.$passhash.'"';
    $res = mysqli_query($link, $sql);
    $vars['userValidated'] = false;
    if(mysqli_num_rows($res)){
      $row = mysqli_fetch_assoc($res);
      if($row['enabled']){
        $vars['userID'] = $row['id'];
        $vars['userValidated'] = true;
      }
    }
    return $vars['userValidated'];
  }

  validateUser();
  $success = false;

  if(!$vars['userValidated']){
    mysqli_close($link);
    die();
  } else {
    if($type == 'client_message'){
      $msg = mysqli_real_escape_string($link, $msg);
      /*
      $sql = 'SELECT id FROM ircLink';
      $res = mysqli_query($link);
      $ar = [];
      $ar[1] = 1;
      if(mysqli_num_rows($res)){
        for($i = 0; $i < mysqli_num_rows($res); ++$i){
          $row = mysqli_fetch_assoc($res);
          $ar[(int)$row['id']]=1;
        }
      }
      $nextOpenId = 0;
      for($i = 1; !$nextOpenId && $i < 10000; ++$i){
        if($ar[$i] != 1) $nextOpenId = $i;
      }
      //mysqli_query($link, $sql);
      */
      $sql = 'INSERT INTO ircLink (userID, message, time) VALUES(' . $vars['userID'] . ', "' . $msg . '", ' . ms() . ')';
      $success = mysqli_query($link, $sql);
      //mysqli_query($link, $sql);
    }
  }
  mysqli_close($link);
  echo json_encode([$success, $sql, $row2]);
?>
