<?
  require_once('db.php');
  require_once('getBackups.php');
  $data = json_decode(file_get_contents('php://input'));
  $page = mysqli_real_escape_string($link, $data->{'page'});
  $overrideMaxResults = mysqli_real_escape_string($link, $data->{'maxResultsPerPage'});
  if($overrideMaxResults) $maxResultsPerPage = $overrideMaxResults;

  $start = $maxResultsPerPage * $page;

  $sql="SELECT id FROM consoleitems WHERE private = 0";
  $res = mysqli_query($link, $sql);
  $totalRecords = mysqli_num_rows($res);
  $totalPages = (($totalRecords-1) / $maxResultsPerPage | 0) + 1;
  
  $sql1=$sql = 'SELECT * FROM consoleitems WHERE private = 0 ORDER BY created DESC LIMIT ' . $start . ', ' . $maxResultsPerPage;
  $res = mysqli_query($link, $sql);
  $demos = [];
  for($i = 0; $i < mysqli_num_rows($res); ++$i){
    $demos[] = mysqli_fetch_assoc($res);
  }
  forEach($demos as &$demo){
    $demoID = $demo['id'];
    $sql2 = $sql = 'SELECT * FROM consoleComments WHERE demoID = ' . $demoID;
    $res2 = mysqli_query($link, $sql);
    $demo['comments'] = [];
    for($j=0;$j<mysqli_num_rows($res2);++$j){
      $demo['comments'][] = mysqli_fetch_assoc($res2);
    }
  }
  forEach($demos as &$demo){
    $demo['backups'] = getBackups($demo['id']);
  }
  echo json_encode([$demos, $totalPages, $page]);
?>
