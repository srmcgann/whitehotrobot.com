<?
  require_once('db.php');
  require_once('getBackups.php');
  $data = json_decode(file_get_contents('php://input'));
  $name = mysqli_real_escape_string($link, $data->{'name'});
  $page = mysqli_real_escape_string($link, $data->{'page'});
  $loggedinUserName = mysqli_real_escape_string($link, $data->{'loggedinUserName'});
	$passhash = mysqli_real_escape_string($link, $data->{'passhash'});
  $overrideMaxResults = mysqli_real_escape_string($link, $data->{'maxResultsPerPage'});
  if($overrideMaxResults) $maxResultsPerPage = $overrideMaxResults;

  $admin = false;

  $start = $maxResultsPerPage * $page;

	if($name){
		if($loggedinUserName){
  		$sql = 'SELECT * FROM users WHERE name LIKE "' . $loggedinUserName . '" AND passhash = "' .  $passhash . '"';
		  if($res = mysqli_query($link, $sql)){
  		  $row = mysqli_fetch_assoc($res);
	  	  $loggedinUserData = $row;
				if($row['admin']) $admin = true;
        $loggedinPasshash = $row['passhash'];
	  	}
		}
		$sql='SELECT * FROM users WHERE name LIKE "' . $name . '"';
    $res = mysqli_query($link, $sql);
    $row=mysqli_fetch_assoc($res);
		if(strtoupper($row['name']) === strtoupper($loggedinUserName) && $passhash == $loggedinPasshash  || $admin){
		  $includePrivate = true;
		}
	  unset($row['passhash']);
	  $ret = $row;
		if($includePrivate){

      $sql="SELECT id FROM items WHERE userID = " . $row['id'];
      $res = mysqli_query($link, $sql);
      $totalRecords = mysqli_num_rows($res);
      $totalPages = (($totalRecords-1) / $maxResultsPerPage | 0) + 1;
  
	    $sql1=$sql = "SELECT * FROM items WHERE userID = " . $row['id'] . ' ORDER BY created DESC LIMIT ' . $start . ', ' . $maxResultsPerPage;
	  } else {

      $sql="SELECT id FROM items WHERE private = 0 AND userID = " . $row['id'];
      $res = mysqli_query($link, $sql);
      $totalRecords = mysqli_num_rows($res);
      $morePages = false;
      $totalPages = (($totalRecords-1) / $maxResultsPerPage | 0) + 1;
      if($start + $maxResultsPerPage < $totalRecords + 1) $morePages = true;

		  $sql = "SELECT * FROM items WHERE userID = " . $row['id'] . ' AND private = 0 ORDER BY id DESC LIMIT ' . $start . ', ' . $maxResultsPerPage;
		}
		$res = mysqli_query($link, $sql);
	  $demos = [];
	  for($i=0;$i<mysqli_num_rows($res);++$i){
	  	$row = mysqli_fetch_assoc($res);
  		$demos[]=$row;
  	}
    forEach($demos as &$demo){
      $demoID = $demo['id'];
      $sql = 'SELECT * FROM demoComments WHERE demoID = ' . $demoID;
      $res2 = mysqli_query($link, $sql);
      $demo['comments'] = [];
      for($j=0;$j<mysqli_num_rows($res2);++$j){
        $demo['comments'][] = mysqli_fetch_assoc($res2);
      }
    }
    
		forEach($demos as &$demo){
      $demo['backups'] = getBackups($demo['id']);
    }

    $ret['demos'] = $demos;
  } else {
    $ret = '';
	}
	echo json_encode([$ret, $totalPages]);
?>
