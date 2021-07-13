<?
  require_once('db.php');
  require_once('getBackups.php');
  $data = json_decode(file_get_contents('php://input'));
  $userName = mysqli_real_escape_string($link, $data->{'userName'});
  $passhash = mysqli_real_escape_string($link, $data->{'passhash'});
  $ircID = mysqli_real_escape_string($link, $data->{'ircID'});
  $sql='SELECT * FROM irc WHERE id = ' . $ircID;
  $res = mysqli_query($link, $sql);
  $row=mysqli_fetch_assoc($res);
  $go = false;
  if($row['private']){
    $sql = 'SELECT * FROM users WHERE name LIKE "'. $userName .'" AND passhash = "'.$passhash.'";';
    $res2 = mysqli_query($link, $sql);
    if(mysqli_num_rows($res2)){
      $row2 = mysqli_fetch_assoc($res2);
      if($row2['enabled']){
        if($row2['admin'] || $row2['passhash'] == $passhash) $go = true;
      }
    }
  } else {
    $go = true;
  }
  if($go){
    $ret = $row;
    $ret['backups'] = getBackups($ret['id']);

    $sql = 'SELECT * FROM ircComments WHERE ircID = ' . $ircID;
    $res2 = mysqli_query($link, $sql);
    $ret['comments'] = [];
    for($j=0;$j<mysqli_num_rows($res2);++$j){
      $ret['comments'][] = mysqli_fetch_assoc($res2);
    }
  }

  echo json_encode($ret);
?>
