<?
  require('db.php');

  $sql .= 'USE ' . $playlist_db_name . ';';
	mysqli_query($link, $sql);
	$sql = 'INSERT INTO playlists (item_ids, user_ids, name) VALUES("[]", "[]", "")';
	mysqli_query($link, $sql);
	echo json_encode(mysqli_insert_id($link));
?>
