<?
  require('db.php');
  $data = json_decode(file_get_contents('php://input'));
  $postID = mysqli_real_escape_string($link, $data->{'postID'});
  $userName = mysqli_real_escape_string($link, $data->{'userName'});
  $passhash = mysqli_real_escape_string($link, $data->{'passhash'});
  $sql = 'SELECT * FROM users WHERE name LIKE "' . $userName . '" AND passhash = "'.$passhash.'"';
  $res = mysqli_query($link, $sql);
  if(mysqli_num_rows($res)){
    $sql = 'SELECT * FROM words WHERE id = ' . $postID;
    $res = mysqli_query($link, $sql);
    $row = mysqli_fetch_assoc($res);
    $sql1=$sql = 'DELETE FROM wordsComments WHERE postID = ' . $postID;
    mysqli_query($link, $sql);
    $sql = 'DELETE FROM words where id = ' . $postID;
    mysqli_query($link, $sql);
  }
  echo json_encode($sql1);
?>
