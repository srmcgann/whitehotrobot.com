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
      $sql = 'SELECT * FROM irc WHERE (private = 0 || userID = '.$loggedinUserData['id'].') AND ((title LIKE "%' . $tokens[0] . '%"';
    }else{
      $sql = 'SELECT * FROM irc WHERE private = 0 AND ((title LIKE "%' . $tokens[0] . '%"';
    }
    if(sizeof($tokens)>1){
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
    $sql .= ' OR (ircJS LIKE "%' . $tokens[0] . '%"';
    if(sizeof($tokens)>1){
      array_shift($tokens);
      forEach($tokens as $token){
        $sql .= ' ' . $clause . ' ircJS LIKE "%'.$token.'%"';
      }
    }
    $sql .= ')';
    if($exact){
      $tokens = [ $string ];
    }else{
      $tokens = explode(' ', $string);
    }
    $sql .= ' OR (ircHTML LIKE "%' . $tokens[0] . '%"';
    if(sizeof($tokens)>1){
      array_shift($tokens);
      forEach($tokens as $token){
        $sql .= ' ' . $clause . ' ircHTML LIKE "%'.$token.'%"';
      }
    }
    $sql .= ')';
    if($exact){
      $tokens = [ $string ];
    }else{
      $tokens = explode(' ', $string);
    }
    $sql .= ' OR (ircCSS LIKE "%' . $tokens[0] . '%"';
    if(sizeof($tokens)>1){
      array_shift($tokens);
      forEach($tokens as $token){
        $sql .= ' ' . $clause . ' ircCSS LIKE "%'.$token.'%"';
      }
    }
    $sql .= ')';
    if($exact){
      $tokens = [ $string ];
    }else{
      $tokens = explode(' ', $string);
    }
    $sql .= ' OR (author LIKE "%' . $tokens[0] . '%"';
    if(sizeof($tokens)>1){
      array_shift($tokens);
      forEach($tokens as $token){
        $sql .= ' ' . $clause . ' author LIKE "%'.$token.'%"';
      }
    }
    $sql .= '))';
  }
  
  $sql;
  $res = mysqli_query($link, $sql);
  $totalRecords = mysqli_num_rows($res);
  $totalPages = (($totalRecords-1) / $maxResultsPerPage | 0) + 1;


  $sql1 = $sql .= ' ORDER BY created DESC LIMIT ' . $start . ', ' . $maxResultsPerPage;
  $res = mysqli_query($link, $sql);
  
  $ircs = [];
  for($i = 0; $i < mysqli_num_rows($res); ++$i){
    $ircs[] = mysqli_fetch_assoc($res);
  }

  forEach($ircs as &$irc){
    $ircID = $irc['id'];
    $sql = 'SELECT * FROM ircComments WHERE ircID = ' . $ircID;
    $res = mysqli_query($link, $sql);
    $irc['comments'] = [];
    for($j=0;$j<mysqli_num_rows($res);++$j){
      $irc['comments'][] = mysqli_fetch_assoc($res);
    }
  }
  
  foreach($ircs as &$irc){
    $irc['backups'] = getBackups($irc['id']);
  }
 
  
  echo json_encode([$ircs, $totalPages, $page, $totalRecords, $sql1]);
?>

