<?

  require('syncHistories.php');

  $data = json_decode(file_get_contents('php://input'));
  $demoID = mysqli_real_escape_string($link, $data->{'demoID'});
  $sql = "SELECT * FROM items WHERE id = " . $demoID;
  $res = mysqli_query($link, $sql);
  if($res){
    $out = [];
    for($i=0; $i<mysqli_num_rows($res); ++$i){
      $row = mysqli_fetch_assoc($res);
      $row['id'] = (int)$row['id'];
      array_push($out, $row);
    }
  }
  echo json_encode($out);
?>
