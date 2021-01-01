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
      var username = results[0];
      var succeeded = results[1];
      notes_list = results[2];
      var main_page_error = results[3];

      $("#message").html("<h4>Welcome " + username + "</h4>");

      if(succeeded) {
        list_length = Object.keys(notes_list).length;
        var note, note_title;
        for (var i = 0; i < list_length; i++) {
          note = notes_list[i];
          note_title = note['note_title'];
          $("#cards_holder").append("<div class='card'><a id='note_name' href='#' data-toggle='modal' data-target='#updateModal'><h5 class='card_title'>" + note_title + "</h5></a></div>");

          $("#note_name").on("click", function(e){
            //
          });

        }
      } else {
        $("#main_page_error").html("<p>" + main_page_error + "</p>");
      }
    }
  });

  //add note
  $("#add_note_btn").on("click", function(e){
    var note_title = $("#note_title").val().trim();
    var note_body = $("#note_body").val();

    var ready = true;

    $("#general_note_error").html("");
    $("#note_title_error").html("");

    if(note_title === "") {
      $("#note_title_error").html("<p>Title required</p>");
      ready = false;
    } else {
      $("#note_title_error").html("");
    }

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

          if(succeeded) {
            $("#close_add").click();
          } else {
            $("#general_note_error").html("<p>" + general_error_msg + "</p>");
            $("#note_title_error").html("<p>" + note_title_error_msg + "</p>");
          }
        }
      });
    }

  });

  $("#close_add").on("click", function(e){
    $("#note_title").val("");
    $("#note_body").val("");
    $("#general_note_error").html("");
    $("#note_title_error").html("");
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