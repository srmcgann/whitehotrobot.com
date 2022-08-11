<?
  $ch = curl_init(str_replace(" ","%20",$_GET['url']));
  curl_setopt($ch, CURLOPT_FILE, $fp);
  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
  curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
  curl_setopt($ch,CURLOPT_USERAGENT,'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');
  $original = curl_exec($ch);
  $type = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
  curl_close($ch);
  $keep = false;
  switch($type){    
    case 'image/png' :
      $keep = true;
    case 'image/jpeg':
      $keep = true;
      break;
    case 'image/gif':
      $keep = true;
      break;
    case 'image/bmp':
      $keep = true;
      break;
    case 'image/vnd.microsoft.icon':
      $keep = true;
      break;
    case 'image/tiff':
      $keep = true;
      break;
    case 'image/svg+xml':
      $keep = true;
      break;
    case 'audio/mpeg' :
      $keep = true;
      break;
    case 'video/quicktime' :
      $keep = true;
      break;
    case 'video/mp4' :
      $keep = true;
      break;
    case 'video/vp9' :
      $keep = true;
      break;
    case 'video/webm' :
      $keep = true;
      break;
    case 'video/apng' :
      $keep = true;
      break;
    case 'video/quicktime' :
      $keep = true;
      break;
  }
  if($keep){
    header($type);
    echo $original;
  }
?>
