<?
  require_once('db.php');
  require_once('getBackups.php');
  $data = json_decode(file_get_contents('php://input'));
  $postID = mysqli_real_escape_string($link, $data->{'postID'});
  $userName = mysqli_real_escape_string($link, $data->{'userName'});
  $passhash = mysqli_real_escape_string($link, $data->{'passhash'});
  $database = mysqli_real_escape_string($link, $data->{'database'});
  $sql = 'SELECT * FROM users WHERE name LIKE "' . $userName . '" AND passhash = "'.$passhash.'"';
  $res = mysqli_query($link, $sql);
  if(mysqli_num_rows($res)){
    $sql = 'USE ' . $database . ';';
    mysqli_query($link, $sql);
    $sql='SELECT * FROM games WHERE id = ' . $postID;
    $res = mysqli_query($link, $sql);
    $row=mysqli_fetch_assoc($res);
    $ret = $row;
    $ret['backups'] = getBackups($ret['id']);

    $sql = 'SELECT * FROM gamesComments WHERE postID = ' . $postID;
    $res2 = mysqli_query($link, $sql);
    $ret['comments'] = [];
    for($j=0;$j<mysqli_num_rows($res2);++$j){
      $ret['comments'][] = mysqli_fetch_assoc($res2);
    }
    echo json_encode($ret);
  } else {
    echo json_encode([]);
  }
?>
