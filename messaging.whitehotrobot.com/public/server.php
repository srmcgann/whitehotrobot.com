<?
  error_reporting(E_ALL);
  ini_set('max_execution_time', 0);
  header("Content-Type: text/plain");

  require('db.php');
  $data = json_decode(file_get_contents('php://input'));
  $vars = [];
  $vars['host'] = mysqli_real_escape_string($link, $data->{'host'});
  $vars['port'] = mysqli_real_escape_string($link, $data->{'port'});
  $vars['nick'] = mysqli_real_escape_string($link, $data->{'nick'});
  $vars['password'] = mysqli_real_escape_string($link, $data->{'password'});
  $vars['maxIncomingBufferAge'] = 10000; //ms

  $userName = mysqli_real_escape_string($link, $data->{'userName'});
  $passhash = mysqli_real_escape_string($link, $data->{'passhash'});

  function ms(){
    return microtime(true)*1000|0;
  }

  function validateUser(){
    global $link, $userName, $passhash, $vars;
    $sql = 'SELECT id, enabled FROM users WHERE name LIKE "'.$userName.'" AND passhash = "'.$passhash.'"';
    $res = mysqli_query($link, $sql);
    $vars['userValidated'] = false;
    if(mysqli_num_rows($res)){
      $row = mysqli_fetch_assoc($res);
      if($row['enabled']){
        $vars['userID'] = $row['id'];
        $vars['userValidated'] = true;
      }
    }
    if($vars['userValidated']){
      $sql = 'DELETE FROM ircLink WHERE userID = ' . $vars['userID'];
      mysqli_query($link, $sql);
    }
    return $vars['userValidated'];
  }

  validateUser();

  if(!$vars['userValidated']){
    die();
  } else {

    ob_implicit_flush();

    function connect(){
      global $vars, $link;

      if (($sock = socket_create(AF_INET, SOCK_STREAM, SOL_TCP)) === false) {
        sendText("socket_create() failed: reason: " . socket_strerror(socket_last_error()) . "\n");
      }

      $startTime = time();

        if (socket_connect($sock, gethostbyname($vars['host']), $vars['port']) === false) {
          sendText(json_encode([gethostbyname($vars['host']), $vars['port']]) . "\n");
          sendText("socket_connect() failed: reason: " . socket_strerror(socket_last_error($sock)) . "\n");
        }

        sendText('connected to: ' . json_encode([gethostbyname($vars['host']), $vars['port']]) . "\n");

        $lastPing = time();
        $lastSawClient = time();
        $nextQueueIteration = 100;
        $get = '';

        usleep(2000000);

        while(true){

          while(socket_recv($sock, $recv, 1024, MSG_DONTWAIT)){
            $get .= $recv;
            usleep(500);
          }
          if((time() - $lastPing > 60 * 5) || (time() - $lastSawClient > 60 * 5)) die();

          if($get) {
            if(strlen($get) > 2) relayHostResponseToClient($get);
            $lastPing = time();
            $get = '';
          }
          
          //if(time() - $lastPing > 1) {
          //  sendText('time - lastping: ' . (time() - $lastPing) );
          //}
          //usleep(10000);
          if(ms() - $nextQueueIteration > 0){
            //sendText("wtf...\n");
            $nextQueueIteration = ms() + 100;
            $sql = 'SELECT * FROM ircLink WHERE userID = ' . $vars['userID'] . ' ORDER BY time ASC';
            if($res = mysqli_query($link, $sql)){
              if(mysqli_num_rows($res)){
                $lastSawClient = time();
                $row = mysqli_fetch_assoc($res);
                $msg = $row['message'];
                if(ms() - $row['time'] > $vars['maxIncomingBufferAge']){
                  sendText('message is expired! -discarding' . "\n");
                  $nextQueueIteration = ms();
                } else {
                  socket_write($sock, $msg . "\r\n");
                  sendText('sent: ' . $msg . "\n");
                  if(substr($msg, 0, 4) == 'QUIT') die();
                  //usleep(100000);
                }
                $sql = 'DELETE FROM ircLink WHERE id = ' . $row['id'];
                mysqli_query($link, $sql);
                //usleep(10000);
              }
            }
          }
          //usleep(30000);
        }
      socket_close($sock);
    }

    function sendText($text){
      echo "<><!==!!==!><>";
      echo $text;
      usleep(50000);
    }

    function relayHostResponseToClient($text){
      global $vars;
      echo "<><!==!!==!><>";
      $ret = [];
      $ret['host'] = $vars['host'];
      $ret['type'] = 'server_message';
      $ret['message'] = $text;
      echo json_encode($ret);
      usleep(50000);
    }

    for($i=80;$i--;) echo "<><!==!!==!><>";
    sendText('server starting...' . "\n");
    connect();
  }
?>
