<?
  require("db.php");
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);

  function get_data($url) {
          $ch = curl_init();
          $timeout = 5;
          curl_setopt($ch, CURLOPT_URL, $url);
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
          curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
          $data = curl_exec($ch);
          curl_close($ch);
          return $data;
  }

  $id=mysqli_real_escape_string($link,$_GET['id']);
  $sql="SELECT * FROM applets WHERE id=$id";
  $res=$link->query($sql);
  if(mysqli_num_rows($res)){
    $row=mysqli_fetch_assoc($res);
    echo json_encode($row);
  }
?>

