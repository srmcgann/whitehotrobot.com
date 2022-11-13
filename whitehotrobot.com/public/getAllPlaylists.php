<?
  require('db.php');
  $sql = 'SELECT * FROM playlists ORDER BY id DESC';
  $res = mysqli_query($link, $sql);
  $playlists = [];
  for($i=0;$i<mysqli_num_rows($res);++$i){
    $playlists[]=mysqli_fetch_assoc($res);
  }
  echo json_encode($playlists);
?>
