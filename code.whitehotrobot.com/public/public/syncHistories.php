<?
  require('db.php');

  function demoExists($id){
    global $link;
    $_sql = 'SELECT id FROM items WHERE id = ' . $id;
    $_res = mysqli_query($link, $_sql);
    if(mysqli_num_rows($_res)){
      return true;
    }else{
      return false;
    }
  }

  $sql = 'SELECT * FROM items';
  $res = mysqli_query($link, $sql);
  for($i=0; $i<mysqli_num_rows($res); ++$i){
    $row = mysqli_fetch_assoc($res);
    $demoID = $row['id'];
    $newHistory = [];
    $updateRequired = false;
    if($row['forkHistory']){
      $a = json_decode(str_replace('"','',$row['forkHistory']));
      foreach($a as $id){
        if($id !== -1 && !demoExists($id)){
          array_push($newHistory, -1);
          $updateRequired = true;
        }else{
          array_push($newHistory, $id);
        }
      }
    }
    if($updateRequired){
      $newHistory = str_replace('"','',json_encode($newHistory));
      $sql = 'UPDATE items SET forkHistory = "'.$newHistory.'" WHERE id = ' . $demoID;
      mysqli_query($link, $sql);
    }
  }
?>
