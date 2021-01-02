<?
  require('db.php');
  $data = json_decode(file_get_contents('php://input'));
  $trackID = mysqli_real_escape_string($link, $data->{'trackID'});
  $sql='SELECT * FROM audiocloudTracks WHERE id = ' . $trackID;
  $res = mysqli_query($link, $sql);
  $row=mysqli_fetch_assoc($res);
  $ret = $row;

  $sql = 'SELECT * FROM audiocloudComments WHERE trackID = ' . $trackID;
  $res2 = mysqli_query($link, $sql);
  $ret['comments'] = [];
  for($j=0;$j<mysqli_num_rows($res2);++$j){
    $ret['comments'][] = mysqli_fetch_assoc($res2);
  }

  echo json_encode($ret);
?>
