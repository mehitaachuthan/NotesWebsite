//execute when account page loads
$(function(){
  //notes list length and list
  var list_length;
  var notes_list;

  //immediately receive user details to display, specify action to do
  $.ajax({
    type: "POST",
    url: "../server/account.php",
    data: {
      action_to_take : "receive_data"
    },
    dataType: "json",
    success: function(results) {
      //unwrap information about user and notes from fetching data
      var username = results[0];
      var succeeded = results[1];
      notes_list = results[2];
      var main_page_error = results[3];

      $("#message").html("<h4>Welcome " + username + "</h4>");

      if(succeeded) {
        list_length = Object.keys(notes_list).length;
        var note, note_title;
        //go through each note for the logged in user and add cards to the grid layout
        //include id tag as the note_id, and make link clickable to show update box
        for (var i = 0; i < list_length; i++) {
          note = notes_list[i];
          note_id = note['note_id'];
          note_title = note['note_title'];
          note_body = note['note_body'];
          //id is better to be note_id since note_title may include spaces, but note_id is a number so
          //guaranteed no spaces
          $("#cards_holder").append("<div class='card'><a class='card_link' id='" + note_id + "' href='#' data-toggle='modal' data-target='#updateModal'><h5 class='card_title'>" + note_title + "</h5></a></div>");

          // for link on each note, show update box, and fill update box with title and body values and save
          // note id in the data-* tag of form html element in order to save note_id for future use
          $("#" + note_id).on("click", function(e){
            //note details
            var note_stuff, note_stuff_id, note_stuff_title, note_stuff_body, curr_note_id;
            //current note name is stored in id tag
            curr_note_id = $(this).attr('id');
            //go through each note in notes_list for the user and find correct note by matching id
            //of notes for a user since that is in id tag of card
            for(var x = 0; x < list_length; x++) {
              //get note details
              note_stuff = notes_list[x];
              note_stuff_title = note_stuff['note_title'];
              note_stuff_id = note_stuff['note_id'];
              //if match, use that info to put into fields of update box and save note id on the form
              if(curr_note_id === note_stuff_id) {
                note_stuff_body = note_stuff['note_body'];
                $("#note_title_update").val(note_stuff_title);
                $("#note_body_update").val(note_stuff_body);
                $("#update_form").data("data-note-id", note_stuff_id);
              }
            }
          });

        }
      } else {
        //display any errors
        $("#main_page_error").html("<p>" + main_page_error + "</p>");
      }
    }
  });

  //add note
  $("#add_note_btn").on("click", function(e){
    //get fields
    var note_title = $("#note_title").val().trim();
    var note_body = $("#note_body").val();

    //check if body is more than 150 chars

    var ready = true;

    $("#general_note_error").html("");

    //make sure title is not empty
    if(note_title === "") {
      $("#note_title_error").html("<p>Title required</p>");
      ready = false;
    } else {
      $("#note_title_error").html("");
    }

    //only send post request if fields are ok
    if(ready) {
      $.ajax({
        type: "POST",
        url: "../server/account.php",
        data: {
          action_to_take : "add_data",
          note_title_data : note_title,
          note_body_data : note_body
        },
        dataType: "json",
        success: function(error_statuses) {
          var succeeded = error_statuses[0];
          var general_error_msg = error_statuses[1];
          var note_title_error_msg = error_statuses[2];

          //close add box if success or else display error
          if(succeeded) {
            $("#close_add").click();
            window.location.reload();
          } else {
            $("#general_note_error").html("<p>" + general_error_msg + "</p>");
            $("#note_title_error").html("<p>" + note_title_error_msg + "</p>");
          }
        }
      });
    }

  });

  //update note
  $("#update_note_btn").on("click", function(e){
    var note_title_update = $("#note_title_update").val().trim();
    var note_body_update = $("#note_body_update").val();
    //get the note_id that is saved in html form element in data-* tag
    var note_id_update = parseInt( $("#update_form").data("data-note-id") );

    //check if body is more than 150 chars
    
    var ready = true;

    $("#general_note_update_error").html("");

    //make sure title field exists before making request to update
    if(note_title_update === "") {
      $("#note_title_update_error").html("Title required");
      ready = false;
    } else {
      $("#note_title_update_error").html("");
    }

    //only send post request if fields are ok
    if(ready) {
      $.ajax({
        type: "POST",
        url: "../server/account.php",
        dataType: "json",
        data: {
          action_to_take: "update_data",
          note_id_new: note_id_update,
          note_title_new: note_title_update,
          note_body_new: note_body_update
        },
        success: function(error_statuses){
          var succeeded = error_statuses[0];
          var general_error_msg = error_statuses[1];
          var note_title_error_msg = error_statuses[2];

          //close modal box and refresh page if succeeded or else show error message
          if(succeeded) {
            $("#close_update").click();
            window.location.reload();
          } else {
            $("#general_update_note_error").html(general_error_msg);
            $("#note_title_update_error").html(note_title_error_msg);
          }
        }
      });
    }
  });

  //delete note
  $("#delete_note_btn").on("click", function(e){
    //get the note_id, which has been saved in data-* tag of form element in html
    var note_id_delete = parseInt( $("#update_form").data("data-note-id") );

    $.ajax({
      type: "POST",
      url: "../server/account.php",
      dataType: "json",
      data: {
        action_to_take: "delete_data",
        note_id_remove: note_id_delete
      },
      success: function(error_statuses){
        var succeeded = error_statuses[0];
        var general_error_msg = error_statuses[1];
        var note_title_error_msg = error_statuses[2];

        //close update box after deleting and reload page if successful, or else show error
        if(succeeded) {
          $("#close_update").click();
          window.location.reload();
        } else {
          $("#general_update_note_error").html(general_error_msg);
          $("#note_title_update_error").html(note_title_error_msg);
        }
      }
    });
  });

  //refresh fields for add box when closing
  $("#close_add").on("click", function(e){
    $("#note_title").val("");
    $("#note_body").val("");
    $("#general_note_error").html("");
    $("#note_title_error").html("");
  });

  //refresh fields for update box when closing
  $("#close_update").on("click", function(e){
    $("#note_title_update").val("");
    $("#note_body_update").val("");
    $("#general_update_note_error").html("");
    $("#note_title_update_error").html("");
  });

  //send request to end session if logging out, then move to original screen
  $("#logout_button").on("click", function(e){
    $.ajax({
      type: "POST",
      url: "../server/account.php",
      data: {
        action_to_take : "clear"
      },
      success: function() {
        window.location.href="http://notes.local/pages/landing_page.html";
      }
    });

    e.preventDefault();
  });
});