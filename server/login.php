<?php
  #unwrap data
  $user_username = $_POST["username_data"];
  $user_password = $_POST["password_data"];

  #set error messages
  $general_error_msg = "";
  $username_error_msg = "";
  $password_error_msg = "";

  #whether login was successful
  $success = TRUE;

  #credentials to connect to db
  $servername = "localhost";
  $db_name = "notes_users_db";
  $username = "root";
  $password = "";
  $charset = "utf8mb4";

  #change error mode to throw exception and make fetch value appear as associative array
  $options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
  ];

  try {
    #connect to db
    $conn = new PDO("mysql:host=$servername;dbname=$db_name;charset=$charset", $username, $password, $options);

    #select rows that match username and password
    $sql_statement = "SELECT * FROM users WHERE user_username='$user_username' AND user_password='$user_password';";

    #receive the result of query
    $found = $conn->query($sql_statement);

    #if query successful, check result of query
    if($found) {
      #find num users that matched login info, max 1, min 0
      $num_match = $found->rowCount();

      #no users match means invalid
      if($num_match === 0) {
        $success = FALSE;
        $general_error_msg = "Invalid login";
      } else {
        #successful login
        session_start();
        $_SESSION['username'] = $user_username;
      }

    } else {
      #query failed means problem with statement
      $success = FALSE;
      $general_error_msg = "Failed query";
    }
  } catch(PDOException $e) {
    #catch any exceptions thrown
    $success = FALSE;
    $general_error_msg = $e->getMessage();
  }

  #close db connection
  $conn = null;

  #return error statuses
  $error_statuses = array($success, $general_error_msg, $username_error_msg, $password_error_msg);
  echo json_encode($error_statuses);
?>