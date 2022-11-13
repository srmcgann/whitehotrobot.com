<?
  $db_user="user";
  $db_pass="";
  $db_host="localhost";
  $db="videodemos";
  $link = mysqli_connect($db_host, $db_user, $db_pass, $db);

  $local = false;

  if($local){
    $videodemo_url = 'http://local.code.whitehotrobot.com';
  } else {
    $videodemo_url = 'https://code.whitehotrobot.com';
  }

  $video_db_name = 'videodemos';
  $playlist_db_name = $video_db_name . '';
  
  $sql = 'BEGIN;';
  $sql .= 'CREATE DATABASE IF NOT EXISTS ' . $playlist_db_name . ';';
  $sql .= 'USE ' . $playlist_db_name . ';';
  $sql .= 'CREATE TABLE IF NOT EXISTS `playlists` (`date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP) DEFAULT CHARSET=utf8;';
  $sql .= 'ALTER TABLE `playlists` ADD `id` INT NOT NULL AUTO_INCREMENT, ADD UNIQUE (`id`);';
  $sql .= 'ALTER TABLE `playlists` ADD `db_name` VARCHAR(256) NOT NULL DEFAULT "'.$video_db_name.'";';
  $sql .= 'ALTER TABLE `playlists` ADD `item_ids` VARCHAR(4096) NOT NULL;';
  $sql .= 'ALTER TABLE `playlists` ADD `user_ids` VARCHAR(4096) NOT NULL;';
  $sql .= 'ALTER TABLE `playlists` ADD `db_table_name` VARCHAR(256) NOT NULL DEFAULT "items";';
  $sql .= 'ALTER TABLE `playlists` ADD `name` VARCHAR(256) NOT NULL;';
  $sql .= 'COMMIT;';
  mysqli_multi_query($link, $sql);
  while(mysqli_next_result($link));
?>

