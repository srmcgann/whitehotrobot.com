<?
  $data = json_decode(file_get_contents('php://input'));
  $userName = $data->{'userName'};
  $address = escapeshellarg($userName . '@whitehotrobot.com');
  $password = $password2 = escapeshellarg($data->{'password'});
  $name = escapeshellarg($data->{'name'});
  $otherEmail = escapeshellarg($data->{'otherEmail'});

  $result = 1;
  $command = '';

  if($userName && $password && $name) {
    $output = [];
    $result = null;
    exec($command = "postfixadmin-cli mailbox add $address --password $password --password2 $password2 --name $name  --quota 100 --active 1 --welcome-mail 1 --email-other $otherEmail 2>&1", $output, $result);
    file_put_contents('/home/cantelope/emaillog', 'create mailbox: timestamp: ' . time() . ': command: ' . $command . "\n", FILE_APPEND);
  }
  echo json_encode([$result, $command, $output]);
?>
