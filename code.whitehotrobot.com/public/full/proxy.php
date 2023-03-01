<?
  $src = fopen(str_replace(" ","%20",$_GET['url']), 'r');
  //stream_set_blocking($src, true);

  do{
    $data = fread($src, 1024*64);
    if($data){
      echo $data;
      flush();
      //ob_flush();
    }
  }while($data);
?>

