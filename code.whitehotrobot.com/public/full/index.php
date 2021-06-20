<?
  require('../db.php');

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

  if(isset($_GET['i'])){
    $HTML=$CSS=$JS='';
    $demoid = alphaToDec(mysqli_real_escape_string($link, $_GET['i']));
    $sql = 'SELECT * FROM items WHERE id = ' . $demoid;
    if($res = mysqli_query($link, $sql)){
      $row = mysqli_fetch_assoc($res);
      $HTML = $row['demoHTML'];
      $CSS = $row['demoCSS'];
      $JS = $row['demoJS'];
      $title = $row['title'];
      $userID = $row['userID'];
      $sql = 'SELECT * FROM users WHERE id = ' . $userID;
      $res2 = mysqli_query($link, $sql);
      if($row2 = mysqli_fetch_assoc($res)){
        $avatar = $row['avatar'];
      }
      $favicon = $avatar || 'https://lookie.jsbot.net/uploads/1HVS37.png';
    } else {
      echo '404';
      die();
    }
  } else {
    echo '404';
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

      .homeLink{
        z-index: 10000;
        position: fixed;
        background: #2466;
        cursor: pointer;
        font-size: 12px;
        color: #fff8;
        top: 5px;
        right: 5px;
        border-radius: 3px;
        border: 1px solid #4688;
      }
      .homeLink:focus{
        outline: none;
      }
    </style>
  </head>
  <body>
    <script>
      fetch('/incrementViews.php?id=' + "<?=$pageID?>");
      goHome = () => {
        let a = document.createElement('a')
        a.setAttribute('href', 'https://hosting.whitehotrobot.com')
        a.setAttribute('target', '_blank')
        a.click()
      }
    </script>
    <button class="homeLink" onclick="goHome()">
      free hosting<br>home page
    </button>
    <?=$HTML?>
    <script><?=$JS?></script>
  </body>
</html>
