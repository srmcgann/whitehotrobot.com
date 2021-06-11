<?
  require_once('db.php');
  require_once('getBackups.php');
  $data = json_decode(file_get_contents('php://input'));
  $string = mysqli_real_escape_string($link, $data->{'string'});
  $loggedinUserName = mysqli_real_escape_string($link, $data->{'loggedinUserName'});
  $passhash = mysqli_real_escape_string($link, $data->{'passhash'});
  $page = mysqli_real_escape_string($link, $data->{'page'});
  $exact = mysqli_real_escape_string($link, $data->{'exact'});
  $allWords = mysqli_real_escape_string($link, $data->{'allWords'});
  $overrideMaxResults = mysqli_real_escape_string($link, $data->{'maxResultsPerPage'});
  if($overrideMaxResults) $maxResultsPerPage = $overrideMaxResults;

  if($exact){
    $tokens = [ $string ];
  }else{
    $tokens = explode(' ', $string);
  }
  
  if($allWords){
    $clause = 'AND';
  }else{
    $clause = 'OR';
  }
  
  $admin = false;
  $start = $maxResultsPerPage * $page;

  if(sizeof($tokens)){
    
    $confirmed = false;
		if($loggedinUserName){
  		$sql = 'SELECT * FROM users WHERE name LIKE "' . $loggedinUserName . '" AND passhash = "' .  $passhash . '"';
		  if($res = mysqli_query($link, $sql)){
  		  $row = mysqli_fetch_assoc($res);
	  	  $loggedinUserData = $row;
        $confirmed = true;
				if($row['admin']) $admin = true;
	  	}
		}

    if($loggedinUserName && $confirmed){
      $sql = 'SELECT * FROM words WHERE (private = 0 || userID = '.$loggedinUserData['id'].') AND (description LIKE "%' . $tokens[0] . '%"';
    }else{
      $sql = 'SELECT * FROM words WHERE private = 0 AND (description LIKE "%' . $tokens[0] . '%"';
    }
    if(sizeof($tokens>1)){
      array_shift($tokens);
      forEach($tokens as $token){
        $sql .= ' ' . $clause . ' description LIKE "%'.$token.'%"';
      }
    }
    $sql .= ')';
    if($exact){
      $tokens = [ $string ];
    }else{
      $tokens = explode(' ', $string);
    }
    $sql .= ' OR (title LIKE "%' . $tokens[0] . '%"';
    if(sizeof($tokens>1)){
      array_shift($tokens);
      forEach($tokens as $token){
        $sql .= ' ' . $clause . ' title LIKE "%'.$token.'%"';
      }
    }
    $sql .= ')';
    if($exact){
      $tokens = [ $string ];
    }else{
      $tokens = explode(' ', $string);
    }
    $sql .= ' OR (tags LIKE "%' . $tokens[0] . '%"';
    if(sizeof($tokens>1)){
      array_shift($tokens);
      forEach($tokens as $token){
        $sql .= ' ' . $clause . ' tags LIKE "%'.$token.'%"';
      }
    }
    $sql .= ')';
    if($exact){
      $tokens = [ $string ];
    }else{
      $tokens = explode(' ', $string);
    }
    $sql .= ' OR (text LIKE "%' . $tokens[0] . '%"';
    if(sizeof($tokens>1)){
      array_shift($tokens);
      forEach($tokens as $token){
        $sql .= ' ' . $clause . ' text LIKE "%'.$token.'%"';
      }
    }
    $sql .= ')';
    if($exact){
      $tokens = [ $string ];
    }else{
      $tokens = explode(' ', $string);
    }
    $sql .= ' OR (author LIKE "%' . $tokens[0] . '%"';
    if(sizeof($tokens>1)){
      array_shift($tokens);
      forEach($tokens as $token){
        $sql .= ' ' . $clause . ' author LIKE "%'.$token.'%"';
      }
    }
    $sql .= ')';
  }
  
  $sql1 = $sql;
	$res = mysqli_query($link, $sql);
  $totalRecords = mysqli_num_rows($res);
  $totalPages = (($totalRecords-1) / $maxResultsPerPage | 0) + 1;


  $sql .= ' ORDER BY date DESC LIMIT ' . $start . ', ' . $maxResultsPerPage;
	$res = mysqli_query($link, $sql);
  
	$posts = [];
	for($i = 0; $i < mysqli_num_rows($res); ++$i){
		$posts[] = mysqli_fetch_assoc($res);
  }

  foreach($posts as &$post){
    $post['backups'] = getBackups($post['id']);
  }

  forEach($posts as &$post){
		$postID = $post['id'];
    $sql = 'SELECT * FROM wordsComments WHERE postID = ' . $postID;
    $res = mysqli_query($link, $sql);
    $post['comments'] = [];
    for($j=0;$j<mysqli_num_rows($res);++$j){
      $post['comments'][] = mysqli_fetch_assoc($res);
    }
  }
  
  
  
	echo json_encode([$posts, $totalPages, $page, $totalRecords]);
?>

