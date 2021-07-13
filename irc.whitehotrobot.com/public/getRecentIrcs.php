<?
  require_once('db.php');
  require_once('getBackups.php');
  $data = json_decode(file_get_contents('php://input'));
  $page = mysqli_real_escape_string($link, $data->{'page'});
  $overrideMaxResults = mysqli_real_escape_string($link, $data->{'maxResultsPerPage'});
  if($overrideMaxResults) $maxResultsPerPage = $overrideMaxResults;

  $start = $maxResultsPerPage * $page;

  $sql="SELECT id FROM irc WHERE private = 0";
  $res = mysqli_query($link, $sql);
  $totalRecords = mysqli_num_rows($res);
  $totalPages = (($totalRecords-1) / $maxResultsPerPage | 0) + 1;
  
  $sql1=$sql = 'SELECT * FROM irc WHERE private = 0 ORDER BY created DESC LIMIT ' . $start . ', ' . $maxResultsPerPage;
  $res = mysqli_query($link, $sql);
  $ircs = [];
  for($i = 0; $i < mysqli_num_rows($res); ++$i){
    $ircs[] = mysqli_fetch_assoc($res);
  }
  forEach($ircs as &$irc){
    $ircID = $irc['id'];
    $sql2 = $sql = 'SELECT * FROM ircComments WHERE ircID = ' . $ircID;
    $res2 = mysqli_query($link, $sql);
    $irc['comments'] = [];
    for($j=0;$j<mysqli_num_rows($res2);++$j){
      $irc['comments'][] = mysqli_fetch_assoc($res2);
    }
  }
  forEach($ircs as &$irc){
    $irc['backups'] = getBackups($irc['id']);
  }
  echo json_encode([$ircs, $totalPages, $page]);
?>
