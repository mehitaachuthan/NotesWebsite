<?php
  $username = $_POST["username_data"];
  $password = $_POST["password_data"];

  $general_error_msg = "";
  $username_error_msg = "";
  $password_error_msg = "";

  $success = TRUE;

  #verify credentials

  $error_statuses = array($success, $general_error_msg, $username_error_msg, $password_error_msg);
  echo json_encode($error_statuses);
?>