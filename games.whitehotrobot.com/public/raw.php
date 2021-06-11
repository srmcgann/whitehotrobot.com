<?
  header('Content-Type:text/plain');
  function alphaToDec($val){
    $pow=0;
    $res=0;
    while($val!=""){
      $cur=$val[strlen($val)-1];
      $val=substr($val,0,strlen($val)-1);
      $mul=ord($cur)<58?$cur:ord($cur)-(ord($cur)>96?87:29);
      $res+=$mul*pow(62,$pow);
      $pow++;
    }
    return $res;
  }

  require('db.php');
  $id=mysqli_real_escape_string($link, $_GET['slug']);
  $sql='SELECT text FROM games WHERE id = ' . alphaToDec($id);
  $res = mysqli_query($link, $sql);
  if(mysqli_num_rows($res)){
    echo mysqli_fetch_assoc($res)['text'];
  }
?>
