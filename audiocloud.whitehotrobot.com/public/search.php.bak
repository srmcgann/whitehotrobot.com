<?
  require('db.php');
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
      $sql = 'SELECT * FROM audiocloudTracks WHERE (private = 0 || userID = '.$loggedinUserData['id'].') AND (description LIKE "%' . $tokens[0] . '%"';
    }else{
      $sql = 'SELECT * FROM audiocloudTracks WHERE private = 0 AND (description LIKE "%' . $tokens[0] . '%"';
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
    $sql .= ' OR (trackName LIKE "%' . $tokens[0] . '%"';
    if(sizeof($tokens>1)){
      array_shift($tokens);
      forEach($tokens as $token){
        $sql .= ' ' . $clause . ' trackName LIKE "%'.$token.'%"';
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
  
  $tracks = [];
  for($i = 0; $i < mysqli_num_rows($res); ++$i){
    $tracks[] = mysqli_fetch_assoc($res);
  }
  forEach($tracks as &$track){
    $trackID = $track['id'];
    $sql = 'SELECT * FROM audiocloudComments WHERE trackID = ' . $trackID;
    $res = mysqli_query($link, $sql);
    $track['comments'] = [];
    for($j=0;$j<mysqli_num_rows($res);++$j){
      $track['comments'][] = mysqli_fetch_assoc($res);
    }
  }
  echo json_encode([$tracks, $totalPages, $page, $totalRecords, $sql1]);
?>

