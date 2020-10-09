<?

  require('syncHistories.php');

  $sql = 'SELECT * FROM items ORDER BY created DESC LIMIT 50';
  $res = mysqli_query($link, $sql);
  if($res){
    $out = [];
    for($i=0; $i<mysqli_num_rows($res); ++$i){
      $row = mysqli_fetch_assoc($res);
      $row['id'] = (int)$row['id'];
      if($row['videoLink'] && $row['demoJS'] && $row['demoCSS'] && $row['demoHTML'] && $row['title']) array_push($out, $row);
    }
  }
  echo json_encode($out);
?>
