<?php
  # unwrap data as it is sent, may be in JSON or some other form
  $user_first_name = $_POST["first_name_data"];
  $user_last_name = $_POST["last_name_data"];
  $user_username = $_POST["username_data"];
  $user_password = $_POST["password_data"];

  $general_error_msg = "";
  $first_name_error_msg = "";
  $last_name_error_msg = "";
  $username_error_msg = "";
  $password_error_msg = "";

  #whether there are no errors in registration
  $success = TRUE;

  #connect to database
  $servername = 'localhost';
  $db_name   = 'notes_users_db';
  $username = 'root';
  $password = 'qp0sk0dj0vb01#';
  $charset = 'utf8mb4';

  #change error mode to throw exceptions whenever error occurs
  #set fetch data to format of associative array
  $options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
  ];

  try {
      $conn = new PDO("mysql:host=$servername;dbname=$db_name;charset=$charset", $username, $password, $options);

      #check validity, if not exist same name or username in database
      
      #save user info in database
      $sql_statement = "INSERT INTO users (user_first_name, user_last_name, user_username, user_password) VALUES ('$user_first_name', '$user_last_name', '$user_username', '$user_password');";

      $conn->exec($sql_statement);

  } catch (PDOException $e) {
      $success = FALSE;
      $general_error_msg = $e->getMessage();
  }

  #database connection closes automatically when script ends, but can end earlier
  $conn = null;

  #put error status and error messages in an array to send back
  $error_status = array($success, $general_error_msg, $first_name_error_msg, $last_name_error_msg, $username_error_msg, $password_error_msg);

  echo json_encode($error_status);
?>