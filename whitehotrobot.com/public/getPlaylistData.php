<?
  require('db.php');

	$tables = [
	  ['database' => $db, 'table name' => 'users', 'sort' => 'ASC'],
		['database' => $db, 'table name' => 'items', 'sort' => 'DESC'],
    ['database' => $playlist_db_name, 'table name' => 'playlists', 'sort' => 'DESC']
  ];
  $data = [];

	$sql = 'BEGIN;';
	foreach($tables as $table){
    $sql .= 'USE ' . $table['database'] . ';';
	  $sql .= 'SELECT * FROM ' . $table['table name'] . ' ORDER BY id ' . $table['sort'] . ';';
		$data[$table] = [];
	}
	$sql .= 'COMMIT;';
	$t = 0;
	if(mysqli_multi_query($link, $sql)){
    mysqli_next_result($link);
    do{
		  if($res = mysqli_store_result($link)){
  			$data[$tables[$t]['table name']] = [];
        while($row = mysqli_fetch_assoc($res)){
          unset($row['passhash']);
          unset($row['admin']);
          if((!isset($row['videoLink'])) || $row['videoLink']) $data[$tables[$t]['table name']][] = $row;
			  }
  			$t++;
        mysqli_free_result($res);
		  }
	  } while(mysqli_next_result($link) && $t < sizeof($tables));
	}
	echo json_encode($data);
?>
