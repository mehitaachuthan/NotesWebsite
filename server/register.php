<?php
  # unwrap data as it is sent, may be in JSON or some other form
  $user_first_name = $_POST["first_name_data"];
  $user_last_name = $_POST["last_name_data"];
  $user_username = $_POST["username_data"];
  $user_password = $_POST["password_data"];

  $first_name_error_msg = "";
  $last_name_error_msg = "";
  $username_error_msg = "";
  $password_error_msg = "";

  #whether there are no errors
  $success = TRUE;

  #check validity, if not exist same name or username in database

  #send to database

  #check if any error

  #put error status and error messages in an array to send back
  $error_status = array($success, $first_name_error_msg, $last_name_error_msg, $username_error_msg, $password_error_msg);

  echo json_encode($error_status);
?>