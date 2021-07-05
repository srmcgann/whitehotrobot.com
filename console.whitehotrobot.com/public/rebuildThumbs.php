<?
  require('db.php');
  $sql = 'SELECT id FROM consoleitems';
  $res = mysqli_query($link, $sql);
  for($i=0;$i<mysqli_num_rows($res);++$i){
    $row=mysqli_fetch_assoc($res);
    file_get_contents($baseFullURL . '/vidThumb.php?id=' . $row['id']);
  }
?>
