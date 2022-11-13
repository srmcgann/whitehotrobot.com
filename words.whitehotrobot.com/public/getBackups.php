<?
  function getBackups($targetID){
    global $link;
    $backups = [];
    //require_once('db.php');
    //$data = json_decode(file_get_contents('php://input'));
    $targetDB = 'videodemos';//mysqli_real_escape_string($link, $data->{'targetDB'});
    $targetTable = 'words';//mysqli_real_escape_string($link, $data->{'targetTable'});
    //$targetID = '600012';//mysqli_real_escape_string($link, $data->{'id'});
    $sql = 'SHOW DATABASES';
    $res = mysqli_query($link, $sql);
    for($i = 0; $i < mysqli_num_rows($res); $i++){
      $db = mysqli_fetch_assoc($res)['Database'];
      if(substr($db, 0, strlen($targetDB)) == $targetDB && strlen($db) > strlen($targetDB)){
        $sql = 'USE ' . $db . ';';
        mysqli_query($link, $sql);
        $sql = 'SELECT * FROM ' . $targetTable . ' WHERE id = ' . $targetID . ' ORDER BY id DESC;';
        if(($res2 = mysqli_query($link, $sql)) && mysqli_num_rows($res2)){
          $ar = mysqli_fetch_assoc($res2);
          $ar['Database'] = $db;
          $db_timestamp = explode('_', $db)[sizeof(explode('_', $db))-1];
          if($db_timestamp){
            $ar['backup_date'] = date('M d Y, H:i', $db_timestamp) . ' PST';
            $add = true;
            foreach($backups as $backup){
              if($backup['text'] == $ar['text'] &&
                 $backup['title'] == $ar['title'] &&
                 $backup['description'] == $ar['description'] &&
                 $backup['tags'] == $ar['tags']) $add = false;
            }
            if($add){
              $backups[]=$ar;
            }
          }
        }
      }
    }
    $sql = 'USE ' . $targetDB;
    mysqli_query($link, $sql);
    return $backups;
  }
?>
