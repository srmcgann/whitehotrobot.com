<?
  require('db.php');
  $data = json_decode(file_get_contents('php://input'));
  $userName = mysqli_real_escape_string($link, $data->{'userName'});
  $passhash = mysqli_real_escape_string($link, $data->{'passhash'});
  $comment = mysqli_real_escape_string($link, $data->{'comment'});
  $commentID = mysqli_real_escape_string($link, $data->{'commentID'});
  $sql = 'SELECT * FROM users WHERE name LIKE "'. $userName .'" AND passhash = "'.$passhash.'";';
  $res = mysqli_query($link, $sql);
  $success = false;
  if(mysqli_num_rows($res)){
    $row = mysqli_fetch_assoc($res);
    if($row['enabled']){
      if($row['admin']){
        $sql = 'UPDATE audiocloudComments SET text = "'.$comment.'" WHERE id = '.$commentID;
      } else {
        $sql = 'UPDATE audiocloudComments SET text = "'.$comment.'" WHERE id = '.$commentID . ' AND userID = ' . $row['id'];
      }
      mysqli_query($link, $sql);
      $success = true;
    }
  }
  echo json_encode([$success]);
?>
