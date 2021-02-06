<?
  require('db.php');
  $data = json_decode(file_get_contents('php://input'));
  $playlistID = mysqli_real_escape_string($link, $data->{'playlistID'});

  function inArray($ar, $key, $search){
		$ret = false;
		$idx = 0;
		foreach($ar as $k=>$val){
			if($k === $key && $val === $search) $ret = $idx;
			$idx++;
		}
		return $ret !== false ? $ret : false;
	}

  $sql = 'SELECT * FROM playlists WHERE id = ' . $playlistID;
	if($res = mysqli_query($link, $sql)){
		$row=mysqli_fetch_assoc($res);
		$playlist = $row;
		$item_ids = json_decode($row['item_ids']);
		if(sizeof($item_ids)){
			$videos = [];
			$sql = 'USE ' . $db;
			mysqli_query($link, $sql);
			rsort($item_ids);
  		foreach($item_ids as $id) {
        if(($idx=inArray($item_ids, 'id', $id)) !== false){
					$videos[] = $videos[$idx];
				} else {
  				$sql = 'SELECT * FROM items WHERE id = ' . $id;
	  			if($res = mysqli_query($link, $sql)){
						$row = mysqli_fetch_assoc($res);
            unset($row['demoHTML']);
            unset($row['demoCSS']);
            unset($row['demoJS']);
            if($row['videoLink']) $videos[] = $row;	
					}
				}
	  	}
		}
	}
  if($playlist && sizeof($videos)){
		echo json_encode(['playlist'=>$playlist, 'videos'=>$videos]);
	} else {
		echo json_encode(false);
	}
?>
