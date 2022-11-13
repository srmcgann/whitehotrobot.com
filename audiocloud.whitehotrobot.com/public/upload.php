<?
putenv('TMPDIR=/tmp');
$targetDir = '/var/www/html/whitehotrobot_assets/audio/';
$tmpFilePath = $_FILES['file']['tmp_name'];
$success = false;
if ($tmpFilePath != ""){
  $filename = strtoupper($_FILES['file']['name']);
  $suffix = '.' . substr($filename, strlen($filename)-3);
  if($suffix == '.MP3' || $suffix == '.WAV' || $suffix == '.OGG'){
    $newFileName = md5(htmlspecialchars($_POST['title']) . '_' . $_POST['author'] . '_' . $_FILES['file']['name']) . $suffix;
    $newFilePath = $targetDir . $newFileName;
    rename($tmpFilePath, $newFilePath);
    chmod($newFilePath, 0755);
    require('db.php');
    $userID = mysqli_real_escape_string($link, $_POST['userID']);
    $author = mysqli_real_escape_string($link, $_POST['author']);
    $trackName = mysqli_real_escape_string($link, $_POST['trackName']);
    $description = '';
    $audioFile = $baseAssetsURL . '/audio/' . $newFileName;
    $sql = 'INSERT INTO audiocloudTracks (userID, author, trackName, playlists, private, description, audioFile, plays) VALUES('.$userID.',"'.$author.'","'.$trackName.'","[]",1,"'.$description.'","'.$audioFile.'",0)';
    mysqli_query($link, $sql);
    $success = true;
  }
  return json_encode($success);
}
?>
