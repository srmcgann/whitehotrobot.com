<?php
  for($i=0; $i< 400; ++$i) {
    echo shell_exec('node thumb.js ' . $i);
  }
?>
