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
    $demoslug = mysqli_real_escape_string($link, $_GET['i']);
    $demoid = alphaToDec($demoslug);
    $sql = 'SELECT * FROM consoleitems WHERE id = ' . $demoid;
    if($res = mysqli_query($link, $sql)){
      $row = mysqli_fetch_assoc($res);
      $userID = $row['userID'];
      $sql2 = 'SELECT * FROM users WHERE id = ' . $userID;
      $res2 = mysqli_query($link, $sql2);
      $row2 = mysqli_fetch_assoc($res2);
      if(!$row['private'] || ($res2 && ((isset($_COOKIE['token']) && $_COOKIE['token'] == $row2['passhash']) || (isset($_COOKIE['token']) && $row2['admin'])))){
        $HTML = $row['demoHTML'];
        $CSS = $row['demoCSS'];
        $JS = $row['demoJS'];
        $title = $row['title'];
        if($res2){
          $favicon = $row2['avatar'];
        } else {
          $favicon = 'https://lookie.jsbot.net/uploads/1HVS37.png';
        }
      } else {
        echo '404';
        die();
      }
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
    <button class="homeLink" onclick="goHome()">
      free hosting<br>home page
    </button>
    <?=$HTML?>
    <script>
      let sendData = {demoID: <?=$demoid?>}
      let url = '<?=$baseProtocol?>://<?=$baseURL?>/incrementViews.php'
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      })
    </script>
    <script><?=$JS?></script>
  </body>
</html>
