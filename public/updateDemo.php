<?
  require('db.php');
  $data = json_decode(file_get_contents('php://input'));
  $demoHTML = mysqli_real_escape_string($link, $data->{'demoHTML'});
  $demoCSS = mysqli_real_escape_string($link, $data->{'demoCSS'});
  $demoJS = mysqli_real_escape_string($link, $data->{'demoJS'});
  $userName = mysqli_real_escape_string($link, $data->{'userName'});
  $passhash = mysqli_real_escape_string($link, $data->{'passhash'});
  $demoID = mysqli_real_escape_string($link, $data->{'demoID'});
  $sql = 'SELECT * FROM users WHERE name LIKE "' . $userName . '" AND passhash = "'.$passhash.'";';
  $res = mysqli_query($link, $sql);
  $success = false;
  if(mysqli_num_rows($res)){
    $row = mysqli_fetch_assoc($res);
    if($row['enabled']){
      if($row['admin']){
        $sql = 'UPDATE items SET demoHTML = "'.$demoHTML.'", demoCSS = "'.$demoCSS.'", demoJS = "'.$demoJS.'" WHERE id = '.$demoID;
      } else {
        $sql = 'UPDATE items SET demoHTML = "'.$demoHTML.'", demoCSS = "'.$demoCSS.'", demoJS = "'.$demoJS.'" WHERE id = '.$demoID . ' AND userID = ' . $row['id'];
      }
      mysqli_query($link, $sql);
      $success = true;
    }
  }
  echo json_encode([$success]);
?>
