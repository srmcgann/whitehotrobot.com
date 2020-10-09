<?
  require('db.php');
  $data = json_decode(file_get_contents('php://input'));
  $pageHTML = mysqli_real_escape_string($link, $data->{'pageHTML'});
  $pageCSS = mysqli_real_escape_string($link, $data->{'pageCSS'});
  $pageJS = mysqli_real_escape_string($link, $data->{'pageJS'});
  $userName = mysqli_real_escape_string($link, $data->{'userName'});
  $passhash = mysqli_real_escape_string($link, $data->{'passhash'});
  $pageID = mysqli_real_escape_string($link, $data->{'pageID'});
  $sql = 'SELECT * FROM users WHERE name LIKE "' . $userName . '" AND passhash = "'.$passhash.'";';
  $res = mysqli_query($link, $sql);
  $success = false;
  if(mysqli_num_rows($res)){
    $row = mysqli_fetch_assoc($res);
    if($row['enabled']){
      if($row['admin']){
        $sql = 'UPDATE pages SET pageHTML = "'.$pageHTML.'", pageCSS = "'.$pageCSS.'", pageJS = "'.$pageJS.'" WHERE id = '.$pageID;
      } else {
        $sql = 'UPDATE pages SET pageHTML = "'.$pageHTML.'", pageCSS = "'.$pageCSS.'", pageJS = "'.$pageJS.'" WHERE id = '.$pageID . ' AND userID = ' . $row['id'];
      }
      mysqli_query($link, $sql);
      $success = true;
    }
  }
  echo json_encode([$success,$sql]);
?>

