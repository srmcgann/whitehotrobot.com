<?
  require('db.php');
  $data = json_decode(file_get_contents('php://input'));
  $postID = mysqli_real_escape_string($link, $data->{'postID'});
  $sql='SELECT * FROM words WHERE id = ' . $postID;
  $res = mysqli_query($link, $sql);
  $row=mysqli_fetch_assoc($res);
  $ret = $row;

  $sql = 'SELECT * FROM wordsComments WHERE postID = ' . $postID;
  $res2 = mysqli_query($link, $sql);
  $ret['comments'] = [];
  for($j=0;$j<mysqli_num_rows($res2);++$j){
    $ret['comments'][] = mysqli_fetch_assoc($res2);
  }

  echo json_encode($ret);
?>