<?
  header ('Content-Type: image/png'); 
  $original = file_get_contents($_GET['url']);
  echo imagepng(imagecreatefromstring($original));
?>
