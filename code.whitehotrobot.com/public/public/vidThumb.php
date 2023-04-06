<?
  require('db.php');

  function thumbLink($src){
    if(strpos($src, 'youtu.be')===false && strpos($src, 'youtube.com')===false){
      $videoLink = $src;
      if($videoLink){
        $fileName = md5($videoLink) . '.jpg';
        mkdir('thumbs');
        if(!file_exists('./thumbs/' . $fileName)){
          exec ('ffmpeg -i "' . $videoLink .'" -ss 00:00:00.300 -vframes 1 ' . './thumbs/' . $fileName);
          $original = imagecreatefromjpeg('./thumbs/' . $fileName);
          list($width, $height) = getimagesize('./thumbs/' . $fileName);
          $newWidth = max(800, round($width * .5));
          $newHeight = $newWidth * ($height / $width);
          $resized = imagecreatetruecolor($newWidth, $newHeight);
          imagecopyresampled($resized, $original, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
          imagejpeg($resized, './thumbs/' . $fileName);
          exec('chmod 775 ./thumbs/' . $fileName);
        }
        return  (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https:" : "http:") . "//{$_SERVER['HTTP_HOST']}" . '/thumbs/' . $fileName;
      } else {
        return '';
      }
    } else {
      if(strpos($src, 'youtube.com') === false){
        $a = explode('/', $src)[sizeof(explode('/', $src))-1];
        $a = explode('?', $a)[0];
        return 'http://img.youtube.com/vi/' . $a . '/0.jpg';
      }
      $a = explode('?v=', $src);
      $a = explode("&", $a[sizeof($a)-1])[0];
      return 'http://img.youtube.com/vi/' . $a . '/0.jpg';
    }
  }

  if($_GET['id']){
    $demoID = $_GET['id'];
  } else {
    $data = json_decode(file_get_contents('php://input'));
    $demoID = mysqli_real_escape_string($link, $data->{'demoID'});
  }
  $sql = "SELECT * FROM items WHERE id = " . $demoID;
  $res = mysqli_query($link, $sql);
  $url = '';
  if($res){
    $row = mysqli_fetch_assoc($res);
    $row['id'] = (int)$row['id'];
    $videoLink = mysqli_real_escape_string($link, $row['videoLink']);
    $url=thumbLink($videoLink);
    $sql = 'UPDATE items SET videoThumb = "'.$url.'" WHERE id = ' . $row['id'];
    mysqli_query($link, $sql);
  }
  echo json_encode($url);
?>
