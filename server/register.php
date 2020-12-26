<?php
  # unwrap data as it is sent, may be in JSON or some other form
  $user_first_name = $_POST["first_name_data"];
  $user_last_name = $_POST["last_name_data"];
  $user_username = $_POST["username_data"];
  $user_password = $_POST["password_data"];

  #set success to true for now
  $success = TRUE;

  #send to database


  #return success
  echo $success;
?>