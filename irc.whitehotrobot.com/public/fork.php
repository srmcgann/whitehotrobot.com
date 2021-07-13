<?
  require('db.php');

  function previousForkID($id){
    global $link;
    $_sql = "SELECT forkedFrom FROM irc WHERE id = " . $id;
    $_res = mysqli_query($link, $_sql);
    if(mysqli_num_rows($_res)){
      $_row = mysqli_fetch_assoc($_res);
      return $_row['forkedFrom'];
    }
    return false;
  }

  function ircExists($id){
    global $link;
    $_sql = 'SELECT id FROM irc WHERE id = ' . $id;
    $_res = mysqli_query($link, $_sql);
    return !!mysqli_num_rows($_res);
  }

  $data = json_decode(file_get_contents('php://input'));
  $userName = mysqli_real_escape_string($link, $data->{'userName'});
  $passhash = mysqli_real_escape_string($link, $data->{'passhash'});
  $ircID = mysqli_real_escape_string($link, $data->{'ircID'});
  $sql = 'SELECT * FROM users WHERE name LIKE "' . $userName . '" AND passhash = "'.$passhash.'";';
  $res = mysqli_query($link, $sql);
  $success = false;
  if(mysqli_num_rows($res)){
    $row = mysqli_fetch_assoc($res);
    if($row['enabled']){
      $userID = $row['id'];
      $author = $row['name'];
      $sql = 'SELECT * FROM irc WHERE id = ' . $ircID;
      $res = mysqli_query($link, $sql);
      if(mysqli_num_rows($res)){
	$irc = mysqli_fetch_assoc($res);
        $title=mysqli_real_escape_string($link, $irc['title']);
        $videoLink=mysqli_real_escape_string($link, $irc['videoLink']);
        $ircHTML=mysqli_real_escape_string($link, $irc['ircHTML']);
        $ircCSS=mysqli_real_escape_string($link, $irc['ircCSS']);
	$ircJS=mysqli_real_escape_string($link, $irc['ircJS']);

	$forkHistory=[$irc['id']];
	$a=json_decode($irc['forkHistory']);
	foreach($a as $id){
	  if(ircExists($id)){
            array_push($forkHistory, $id);
	  }else{
            array_push($forkHistory, -1);
          }
        }
        $forkHistory = str_replace('"', '', json_encode($forkHistory));
        $sql = 'INSERT INTO irc (videoLink, ircJS, ircCSS, ircHTML, title, userID, author, forkHistory) VALUES("'.$videoLink.'","'.$ircJS.'","'.$ircCSS.'","'.$ircHTML.'","'.$title.'",'.$userID.',"'.$author.'","'.$forkHistory.'")';
        mysqli_query($link, $sql);
        $success = true;
      }
    }
  }

  echo json_encode([$success, mysqli_insert_id($link), $sql]);
?>
