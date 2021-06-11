<?
  require('db.php');
  $data = json_decode(file_get_contents('php://input'));
	$gamedata = mysqli_real_escape_string($link, json_encode($data->{'gamedata'}));
	if($gamedata != "null"){
		do{
		  $id = rand(getrandmax() - 1e8, getrandmax());
		  $sql = "SELECT id FROM games WHERE id = " . $id;
		  $res = mysqli_query($link, $sql);
		  $good = true;
		  if(mysqli_num_rows($res)) $good = false;
	  }while(!$good);
	  $sql = 'INSERT INTO games (gamedataA, gamedataB, gamedataC, gamedataD, id) VALUES("'.$gamedata.'", "", "", "", ' . $id . ')';
	  mysqli_query($link, $sql);
	  echo json_encode([mysqli_insert_id($link)]);
  }
?>
