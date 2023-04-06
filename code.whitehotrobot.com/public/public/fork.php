<?
  require('db.php');

  function previousForkID($id){
    global $link;
    $_sql = "SELECT forkedFrom FROM items WHERE id = " . $id;
    $_res = mysqli_query($link, $_sql);
    if(mysqli_num_rows($_res)){
      $_row = mysqli_fetch_assoc($_res);
      return $_row['forkedFrom'];
    }
    return false;
  }

  function demoExists($id){
    global $link;
    $_sql = 'SELECT id FROM items WHERE id = ' . $id;
    $_res = mysqli_query($link, $_sql);
    return !!mysqli_num_rows($_res);
  }

  $data = json_decode(file_get_contents('php://input'));
  $userName = mysqli_real_escape_string($link, $data->{'userName'});
  $passhash = mysqli_real_escape_string($link, $data->{'passhash'});
  $demoID = mysqli_real_escape_string($link, $data->{'demoID'});
  $sql = 'SELECT * FROM users WHERE name LIKE "' . $userName . '" AND passhash = "'.$passhash.'";';
  $res = mysqli_query($link, $sql);
  $success = false;
  if(mysqli_num_rows($res)){
    $row = mysqli_fetch_assoc($res);
    if($row['enabled']){
      $userID = $row['id'];
      $author = $row['name'];
      $sql = 'SELECT * FROM items WHERE id = ' . $demoID;
      $res = mysqli_query($link, $sql);
      if(mysqli_num_rows($res)){
  $demo = mysqli_fetch_assoc($res);
        $title=mysqli_real_escape_string($link, $demo['title']);
        $videoLink=mysqli_real_escape_string($link, $demo['videoLink']);
        $demoHTML=mysqli_real_escape_string($link, $demo['demoHTML']);
        $demoCSS=mysqli_real_escape_string($link, $demo['demoCSS']);
  $demoJS=mysqli_real_escape_string($link, $demo['demoJS']);

  $forkHistory=[$demo['id']];
  $a=json_decode($demo['forkHistory']);
  foreach($a as $id){
    if(demoExists($id)){
            array_push($forkHistory, $id);
    }else{
            array_push($forkHistory, -1);
          }
        }
        $forkHistory = str_replace('"', '', json_encode($forkHistory));
        $sql = 'INSERT INTO items (videoLink, demoJS, demoCSS, demoHTML, title, userID, author, forkHistory) VALUES("'.$videoLink.'","'.$demoJS.'","'.$demoCSS.'","'.$demoHTML.'","'.$title.'",'.$userID.',"'.$author.'","'.$forkHistory.'")';
        mysqli_query($link, $sql);
        $success = true;
      }
    }
  }

  echo json_encode([$success, mysqli_insert_id($link), $sql]);
?>
