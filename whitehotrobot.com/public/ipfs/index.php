<?
  header('Content-Type: text/html');
  $url = $_GET['i'];
  if($url){
    $CID = rtrim(explode('Size', shell_exec('ipfs files stat /'))[0]);
    if($CID) {
      $full = 'https://ipfs.io/ipfs/' . $CID . '/' . $url; 
      echo str_replace('./', $full . '/', file_get_contents($full));
    }
  } else {
    echo 'nothing to see here!';
  }
?>
