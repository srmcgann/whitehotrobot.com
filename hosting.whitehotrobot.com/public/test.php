<?
  $userName = 'some user!#$%^';
  echo file_get_contents("http://local.hosting.whitehotrobot.com/checkUserNameAvailability.php?userName=" . urlencode($userName));
?>
