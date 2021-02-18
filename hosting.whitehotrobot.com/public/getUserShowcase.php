<?
  require('db.php');
  $sql='SELECT * FROM users WHERE has_hosting = TRUE ORDER BY id DESC LIMIT 50';
  $res = mysqli_query($link, $sql);
  $userShowcase = [];
  for($i=0;$i<mysqli_num_rows($res);++$i){
    $row=mysqli_fetch_assoc($res);
    if($row['name']){
      unset($row['passhash']);
      $ret = $row;
      $sql="SELECT * FROM pages WHERE userID = " . $row['id'] . ' AND views > 0 ORDER BY id DESC limit 50';
      $res2 = mysqli_query($link, $sql);
      if(mysqli_num_rows($res2)){
        $pages = [];
        for($j=0;$j<mysqli_num_rows($res2);++$j){
          $row2 = mysqli_fetch_assoc($res2);
          $pages[]=$row2;
        }
        $ret['pages'] = $pages;
        $userShowcase[] = $ret;
      }
    }
  }
  echo json_encode($userShowcase);
?>
