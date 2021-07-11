<?
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
  header('Content-Type: text/html');
  $url = $_GET['i'];
  $CID = rtrim(explode('Size', shell_exec('ipfs files stat /'))[0]);
  if($CID) {
    $full = 'https://ipfs.io/ipfs/' . $CID . '/' . $url; 
    echo str_replace('./', $full . '/', file_get_contents($full));
  }
?>
