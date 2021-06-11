<?
  require('db.php');
  $data = json_decode(file_get_contents('php://input'));
  $userID = mysqli_real_escape_string($link, $data->{'userID'});
  $overrideMaxResults = mysqli_real_escape_string($link, $data->{'maxResultsPerPage'});
	if($overrideMaxResults) $maxResultsPerPage = $overrideMaxResults;

  $page = mysqli_real_escape_string($link, $data->{'page'});
  $start = $maxResultsPerPage * $page;

  $sql='SELECT * FROM users WHERE id = ' . $userID;
  $res = mysqli_query($link, $sql);
  $row=mysqli_fetch_assoc($res);
	unset($row['passhash']);
	$ret = $row;
	
  $sql="SELECT id FROM games WHERE userID = " . $userID;
	$res = mysqli_query($link, $sql);
  $totalRecords = mysqli_num_rows($res);
  $totalPages = (($totalRecords - 1) / $maxResultsPerPage | 0) + 1;
  
	$sql="SELECT * FROM games WHERE userID = " . $userID . ' ORDER BY date DESC LIMIT ' . $start . ', ' . $maxResultsPerPage;
	$res = mysqli_query($link, $sql);
	$posts = [];
	for($i=0;$i<mysqli_num_rows($res);++$i){
		$row = mysqli_fetch_assoc($res);
		$posts[]=$row;
	}
	$ret['posts'] = $posts;

  forEach($posts as &$post){
    $postID = $post['id'];
    $sql = 'SELECT * FROM gamesComments WHERE postID = ' . $postID;
    $res2 = mysqli_query($link, $sql);
    $post['comments'] = [];
    for($j=0;$j<mysqli_num_rows($res2);++$j){
      $post['comments'][] = mysqli_fetch_assoc($res2);
    }
  }

  echo json_encode([$ret, $totalPages]);
?>
