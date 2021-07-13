<?

  require('syncHistories.php');

  $data = json_decode(file_get_contents('php://input'));
  $ircID = mysqli_real_escape_string($link, $data->{'ircID'});
  $sql = "SELECT * FROM irc WHERE id = " . $ircID;
  $res = mysqli_query($link, $sql);
  if($res){
    $out = [];
    for($i=0; $i<mysqli_num_rows($res); ++$i){
      $row = mysqli_fetch_assoc($res);
      $row['id'] = (int)$row['id'];
      $sql = 'SELECT * FROM ircComments WHERE ircID = ' . $row['id'];
      $res2 = mysqli_query($link, $sql);
      $row['comments'] = [];
      for($j=0;$j<mysqli_num_rows($res2);++$j){
        $row['comments'][] = mysqli_fetch_assoc($res2);
      }
      array_push($out, $row);
    }
  }
  echo json_encode($out);
?>
