<?
  $url=str_replace(" ","%20",$_GET['url']);
  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_FILE, $fp);
  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
  curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
  curl_setopt($ch,CURLOPT_USERAGENT,'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');
  $original = curl_exec($ch);
  $type = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
  curl_close($ch);
  header($type);
   echo ($original);
?>
