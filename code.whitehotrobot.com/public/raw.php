<?
  header('Content-Type: application/json');
  require('db.php');
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

  if(isset($_GET['demoid']) || isset($_GET['slug'])){
    if(isset($_GET['slug'])){
      $demoid = alphaToDec(mysqli_real_escape_string($link, $_GET['slug']));
    } else {
      $demoid = mysqli_real_escape_string($link, $_GET['demoid']);
    }
    $sql = 'SELECT * FROM items WHERE id = ' . $demoid;
    if($res = mysqli_query($link, $sql)){
      $row = mysqli_fetch_assoc($res);
      echo json_encode($row);
    } else {
      echo '404';
    }
  } else {
    echo '404';
  }
?>
