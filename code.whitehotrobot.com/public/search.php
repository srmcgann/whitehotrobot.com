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
      $sql = 'SELECT * FROM items WHERE (private = 0 || userID = '.$loggedinUserData['id'].') AND ((title LIKE "%' . $tokens[0] . '%"';
    }else{
      $sql = 'SELECT * FROM items WHERE private = 0 AND ((title LIKE "%' . $tokens[0] . '%"';
    }
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
    $sql .= ' OR (demoJS LIKE "%' . $tokens[0] . '%"';
    if(sizeof($tokens>1)){
      array_shift($tokens);
      forEach($tokens as $token){
        $sql .= ' ' . $clause . ' demoJS LIKE "%'.$token.'%"';
      }
    }
    $sql .= ')';
    if($exact){
      $tokens = [ $string ];
    }else{
      $tokens = explode(' ', $string);
    }
    $sql .= ' OR (demoHTML LIKE "%' . $tokens[0] . '%"';
    if(sizeof($tokens>1)){
      array_shift($tokens);
      forEach($tokens as $token){
        $sql .= ' ' . $clause . ' demoHTML LIKE "%'.$token.'%"';
      }
    }
    $sql .= ')';
    if($exact){
      $tokens = [ $string ];
    }else{
      $tokens = explode(' ', $string);
    }
    $sql .= ' OR (demoCSS LIKE "%' . $tokens[0] . '%"';
    if(sizeof($tokens>1)){
      array_shift($tokens);
      forEach($tokens as $token){
        $sql .= ' ' . $clause . ' demoCSS LIKE "%'.$token.'%"';
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
    $sql .= '))';
  }
  
  $sql;
  $res = mysqli_query($link, $sql);
  $totalRecords = mysqli_num_rows($res);
  $totalPages = (($totalRecords-1) / $maxResultsPerPage | 0) + 1;


  $sql1 = $sql .= ' ORDER BY created DESC LIMIT ' . $start . ', ' . $maxResultsPerPage;
  $res = mysqli_query($link, $sql);
  
  $demos = [];
  for($i = 0; $i < mysqli_num_rows($res); ++$i){
    $demos[] = mysqli_fetch_assoc($res);
  }

  forEach($demos as &$demo){
    $demoID = $demo['id'];
    $sql = 'SELECT * FROM demoComments WHERE demoID = ' . $demoID;
    $res = mysqli_query($link, $sql);
    $demo['comments'] = [];
    for($j=0;$j<mysqli_num_rows($res);++$j){
      $demo['comments'][] = mysqli_fetch_assoc($res);
    }
  }
  
  foreach($demos as &$demo){
    $demo['backups'] = getBackups($demo['id']);
  }
 
  
  echo json_encode([$demos, $totalPages, $page, $totalRecords, $sql1]);
?>

