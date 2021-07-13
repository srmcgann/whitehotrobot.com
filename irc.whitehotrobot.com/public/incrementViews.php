<?
  require("db.php");
  $data = json_decode(file_get_contents('php://input'));
  $ircID = mysqli_real_escape_string($link, $data->{'ircID'});

  function ipToDec($ip){
    $parts=explode(".",$ip);
    return $parts[0]*pow(2,24)+$parts[1]*pow(2,16)+$parts[2]*pow(2,8)+$parts[3];
  }

  function decToIP($dec){
    $ret=$a='';
    for($i=4;$i--;){
      $a = (($dec/256)-floor($dec/256))*256;
      $ret = $a . ($i<3? '.' . $ret : '');
      $dec = floor($dec/256);
    }
    return $ret;
  }

  $viewWindow = 300 * 3; /* 15min */

  $t_minus = time() - $viewWindow;
  $sql = "DELETE FROM ircViews WHERE time < " . $t_minus;
  mysqli_query($link, $sql);

  $go = false;

  if($_SERVER['REMOTE_ADDR']){
    $decIP = ipToDec($_SERVER['REMOTE_ADDR']);
    $sql='SELECT time FROM ircViews WHERE decIP = ' . $decIP . ' AND ircID = ' . $ircID . ' ORDER BY time DESC';
    $sql1=$sql;
    $res = mysqli_query($link, $sql);
    if(mysqli_num_rows($res)){
      $row = mysqli_fetch_assoc($res);
      if(time() - $row['time'] > $t_minus) $go = true;
    } else {
      $go = true;
    }
    if($go){
      $row = mysqli_fetch_assoc($res);
      $sql = 'UPDATE irc SET views = views + 1 WHERE id = ' . $ircID;
      mysqli_query($link, $sql);
      $time = time();
      $sql = 'INSERT INTO ircViews (decIP, ircID, time) VALUES('.$decIP.','.$ircID.','.$time.');';
      mysqli_query($link, $sql);
    }
  }
  echo json_encode([$go]);
?>
