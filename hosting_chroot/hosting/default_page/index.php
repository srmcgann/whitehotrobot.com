<?
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

  $pageID = alphaToDec($_GET['i']);

  $sql='SELECT * FROM pages WHERE id = ' . $pageID;
  $HTML=$CSS=$JS='';
  if($res = mysqli_query($link, $sql)){
    $row = mysqli_fetch_assoc($res);
    $HTML = $row['pageHTML'];
    $CSS = $row['pageCSS'];
    $JS = $row['pageJS'];
    $title = $row['title'];
    $favicon = $row['favicon'];
  } else {
    die();
  }
?>
<!DOCTYPE html>
<html>
  <head>
    <title><?=$title?></title>
    <link rel="icon" href="<?=$favicon?>" type="image/png">
    <style>
      <?=$CSS?>
    </style>
  </head>
  <body>
    <?=$HTML?>
    <script><?=$JS?></script>
    <script>
      fetch('/incrementViews.php?id=' + "<?=$pageID?>");
    </script>
  </body>
</html>
