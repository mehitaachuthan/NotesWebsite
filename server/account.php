<?php
  #start session so that can access data stored in server
  session_start();
  #unwrap action to take data
  $action_to_take = $_POST['action_to_take'];

  #based on action requested, clear session or return user info to display or update, delete, or add
  if($action_to_take === "clear") {
    session_unset();
    session_destroy();

  } else if($action_to_take === "receive_data" or $action_to_take === "add_data" or $action_to_take === "update_data" or $action_to_take === "delete_data") {
    #for updating, deleting, adding, or receiving, make fields needed to be ready
    #not all fields will be used
    $note_id = "";
    $note_title_data = "";
    $note_body_data = "";

    #get info from session
    $username = $_SESSION['username'];
    $user_id = $_SESSION['user_id'];

    #whether successful
    $success = TRUE;

    #errors (not all will be used for each action)
    $main_page_error = "";
    $general_note_error = "";
    $note_title_error = "";

    #save vars needed based on whether to add, delete, or update
    if($action_to_take === "add_data") {
      #get contents of note to add
      $note_title_data = $_POST['note_title_data'];
      $note_body_data = $_POST['note_body_data'];
    } else if($action_to_take === "update_data") {
      #get id of note to update and the contents
      $note_id = $_POST['note_id_new'];
      $note_title_data = $_POST['note_title_new'];
      $note_body_data = $_POST['note_body_new'];
    } else if($action_to_take === "delete_data") {
      #get id of note to remove
      $note_id = $_POST['note_id_remove'];
    }

    #credentials for db connection
    $servername = "localhost";
    $db_name = "notes_users_db";
    $db_username = "root";
    $db_password = "";
    $charset = "utf8mb4";

    #options for throwing exception and fetching
    $options = [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ];

    try {
      #make connection
      $conn = new PDO("mysql:host=$servername;dbname=$db_name;charset=$charset", $db_username, $db_password, $options);

      if($action_to_take === "receive_data") {
        #if receive data, select notes for the user, and save results, but save error if otherwise not work

        $sql_statement = "SELECT * FROM notes WHERE user_id='$user_id'";
        #user query if need to save returned data
        $notes_result = $conn->query($sql_statement);

        if($notes_result) {
          $notes = $notes_result->fetchAll();
        } else {
          $success = FALSE;
          $main_page_error = "Failed to fetch query";
        }

      } else if($action_to_take === "add_data" or $action_to_take === "update_data" or $action_to_take === "delete_data"){
        
        #verify that same user not have duplicate note_title

        #make sql statement based on whether to add, update, or delete
        if($action_to_take === "add_data") {
          $sql_statement = "INSERT INTO notes (user_id, note_title, note_body) VALUES (" . $user_id . ", '" . $note_title_data . "', '" . $note_body_data . "');";
        } else if($action_to_take === "update_data") {
          $sql_statement = "UPDATE notes SET note_title='" . $note_title_data . "', note_body='" . $note_body_data . "' WHERE note_id=" . $note_id . ";";
        } else if($action_to_take === "delete_data") {
          $sql_statement = "DELETE FROM notes WHERE note_id=" . $note_id . ";";
        }

        $conn->exec($sql_statement);
      }

    } catch(PDOException $e) {
      #catch any exceptions
      $success = FALSE;
      if($action_to_take === "receive_data") {
        $main_page_error = $e->getMessage();
      } else if($action_to_take === "add_data" or $action_to_take === "update_data" or $action_to_take === "delete_data"){
        $general_note_error = $e->getMessage();
      }
    }

    $conn = null;

    #return results based on whether receiving data or doing an operation
    if($action_to_take === "receive_data") {
      $results = array($username, $success, $notes, $main_page_error);
      echo json_encode($results);
    } else if($action_to_take === "add_data" or $action_to_take === "update_data" or $action_to_take === "delete_data"){
      $error_statuses = array($success, $general_note_error, $note_title_error);
      echo json_encode($error_statuses);
    }
  }
?>