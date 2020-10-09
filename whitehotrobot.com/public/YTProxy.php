<?
  header('Content-Type: video/mp4');
	//echo $_GET['URL'];
	echo file_get_contents($_GET['URL']);
?>
