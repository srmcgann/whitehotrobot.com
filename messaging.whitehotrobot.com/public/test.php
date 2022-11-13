<?
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

  function ms(){
    $t = microtime(true)*1000|0;
    return $t;
  }

  echo ms() . "\n";

?>
