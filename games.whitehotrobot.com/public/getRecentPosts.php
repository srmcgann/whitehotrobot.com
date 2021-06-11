<?
  require_once('db.php');
  require_once('getBackups.php');
  $data = json_decode(file_get_contents('php://input'));
  $page = mysqli_real_escape_string($link, $data->{'page'});
  $overrideMaxResults = mysqli_real_escape_string($link, $data->{'maxResultsPerPage'});
  if($overrideMaxResults) $maxResultsPerPage = $overrideMaxResults;

  $start = $maxResultsPerPage * $page;

  $sql="SELECT id FROM games WHERE private = 0";
	$res = mysqli_query($link, $sql);
  $totalRecords = mysqli_num_rows($res);
  $totalPages = (($totalRecords-1) / $maxResultsPerPage | 0) + 1;
  
	$sql = 'SELECT * FROM games WHERE private = 0 ORDER BY date DESC LIMIT ' . $start . ', ' . $maxResultsPerPage;
	$res = mysqli_query($link, $sql);
	$posts = [];
	for($i = 0; $i < mysqli_num_rows($res); ++$i){
		$posts[] = mysqli_fetch_assoc($res);
  }
  forEach($posts as &$post){
		$postID = $post['id'];
    $post['backups'] = getBackups($postID);
    $sql = 'SELECT * FROM gamesComments WHERE postID = ' . $postID;
    $res2 = mysqli_query($link, $sql);
    $post['comments'] = [];
    for($j=0;$j<mysqli_num_rows($res2);++$j){
      $post['comments'][] = mysqli_fetch_assoc($res2);
    }
  }
	echo json_encode([$posts, $totalPages, $page]);
?>
