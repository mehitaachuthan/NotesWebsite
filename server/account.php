<?php
  #start session so that can access data stored
  session_start();
  #unwrap action to take data
  $action_to_take = $_POST['action_to_take'];

  #based on action requested, clear session or return user info to display
  if($action_to_take === "clear") {
    session_unset();
    session_destroy();

  } else if($action_to_take === "receive_data" or $action_to_take === "add_data") {
    $note_title_data = "";
    $note_body_data = "";

    $username = $_SESSION['username'];
    $user_id = $_SESSION['user_id'];

    $success = TRUE;

    $main_page_error = "";
    $general_note_error = "";
    $note_title_error = "";

    if($action_to_take === "add_data") {
      $note_title_data = $_POST['note_title_data'];
      $note_body_data = $_POST['note_body_data'];
    }

    $servername = "localhost";
    $db_name = "notes_users_db";
    $db_username = "root";
    $db_password = "";
    $charset = "utf8mb4";

    $options = [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ];

    try {
      $conn = new PDO("mysql:host=$servername;dbname=$db_name;charset=$charset", $db_username, $db_password, $options);

      if($action_to_take === "receive_data") {

        $sql_statement = "SELECT * FROM notes WHERE user_id='$user_id'";
        $notes_result = $conn->query($sql_statement);

        if($notes_result) {
          $notes = $notes_result->fetchAll();
        } else {
          $success = FALSE;
          $main_page_error = "Failed to fetch query";
        }

      } else {
        #add new note

        #verify that same user not have duplicate note_title

        $sql_statement = "INSERT INTO notes (user_id, note_title, note_body) VALUES (" . $user_id . ", '" . $note_title_data . "', '" . $note_body_data . "');";

        $conn->exec($sql_statement);
      }
    } catch(PDOException $e) {
      $success = FALSE;
      if($action_to_take === "receive_data") {
        $main_page_error = $e->getMessage();
      } else {
        $general_note_error = $e->getMessage();
      }
    }

    $conn = null;

    if($action_to_take === "receive_data") {
      $results = array($username, $success, $notes, $main_page_error);
      echo json_encode($results);
    } else {
      $error_statuses = array($success, $general_note_error, $note_title_error);
      echo json_encode($error_statuses);
    }
  }
?>