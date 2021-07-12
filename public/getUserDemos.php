<?
  require("syncHistories.php");
  $data = json_decode(file_get_contents('php://input'));
  $userName = mysqli_real_escape_string($link, $data->{'userName'});
  $userName = str_replace(' ', '_', str_replace("\t", '_', $userName));
  $sql = 'SELECT id FROM users WHERE name LIKE "'.$userName.'"';
  $res = mysqli_query($link, $sql);
  if(mysqli_num_rows($res)){
    $row = mysqli_fetch_assoc($res);
    $userID = $row['id'];
    $sql = "SELECT * FROM items WHERE userID = " . $userID . ' ORDER BY id DESC';
    $res = mysqli_query($link, $sql);
    if($res){
      $out = [];
      for($i=0; $i<mysqli_num_rows($res); ++$i){
        $row = mysqli_fetch_assoc($res);
        $row['id'] = (int)$row['id'];
        $sql = 'SELECT * FROM demoComments WHERE demoID = ' . $row['id'];
        $res2 = mysqli_query($link, $sql);
        $row['comments'] = [];
        for($j=0;$j<mysqli_num_rows($res2);++$j){
          $row['comments'][] = mysqli_fetch_assoc($res2);
        }
        array_push($out, $row);
      }
    }
  }
  echo json_encode($out);
?>
