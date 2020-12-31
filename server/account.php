<?php
  #start session so that can access data stored
  session_start();
  #unwrap action to take data
  $action_to_take = $_POST['action_to_take'];

  #based on action requested, clear session or return user info to display
  if($action_to_take === "clear") {
    session_unset();
    session_destroy();
  } else if($action_to_take === "receive_data") {
    $username = $_SESSION['username'];
    echo $username;
  }
?>