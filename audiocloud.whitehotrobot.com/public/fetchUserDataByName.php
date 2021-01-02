<?
  require('db.php');
  $data = json_decode(file_get_contents('php://input'));
  $name = mysqli_real_escape_string($link, $data->{'name'});
  $loggedinUserName = mysqli_real_escape_string($link, $data->{'loggedinUserName'});
	$passhash = mysqli_real_escape_string($link, $data->{'passhash'});
  $admin = false;

	if($name){
		if($loggedinUserName){
  		$sql = 'SELECT * FROM users WHERE name LIKE "' . $loggedinUserName . '" AND passhash = "' .  $passhash . '"';
		  if($res = mysqli_query($link, $sql)){
  		  $row = mysqli_fetch_assoc($res);
	  	  $loggedinUserData = $row;
				if($row['admin']) $admin = true;
	  	}
		}
		$sql='SELECT * FROM users WHERE name LIKE "' . $name . '"';
    $res = mysqli_query($link, $sql);
    $row=mysqli_fetch_assoc($res);
		if(strtoupper($row['name']) === strtoupper($loggedinUserName) && $passhash == $row['passhash']  || $admin){
		  $includePrivate = true;
		}
	  unset($row['passhash']);
	  $ret = $row;
		if($includePrivate){
	    $sql1=$sql = "SELECT * FROM audiocloudTracks WHERE userID = " . $row['id'] . ' ORDER BY id DESC';
	  } else {
		  $sql = "SELECT * FROM audiocloudTracks WHERE userID = " . $row['id'] . ' AND private = 0 ORDER BY id DESC';
		}
		$res = mysqli_query($link, $sql);
	  $tracks = [];
	  for($i=0;$i<mysqli_num_rows($res);++$i){
	  	$row = mysqli_fetch_assoc($res);
  		$tracks[]=$row;
  	}
    forEach($tracks as &$track){
      $trackID = $track['id'];
      $sql = 'SELECT * FROM audiocloudComments WHERE trackID = ' . $trackID;
      $res2 = mysqli_query($link, $sql);
      $track['comments'] = [];
      for($j=0;$j<mysqli_num_rows($res2);++$j){
        $track['comments'][] = mysqli_fetch_assoc($res2);
      }
    }
  	$ret['audiocloudTracks'] = $tracks;
    $sql="SELECT * FROM audiocloudPlaylists WHERE userID = " . $row['id'] . ' ORDER BY id DESC';
    $res = mysqli_query($link, $sql);
    $playlists = [];
    for($i=0;$i<mysqli_num_rows($res);++$i){
      $row = mysqli_fetch_assoc($res);
      $playlists[]=$row;
    }
    $ret['audiocloudPlaylists'] = $playlists;
  } else {
    $ret = '';
	}
	$ret['loggedinUserData']=$sql1;
	echo json_encode($ret);
?>
