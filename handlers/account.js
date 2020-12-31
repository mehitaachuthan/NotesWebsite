//execute when account page loads
$(function(){
  //immediately receive user details to display, specify action to do
  $.ajax({
    type: "POST",
    url: "../server/account.php",
    data: {
      action_to_take : "receive_data"
    },
    success: function(username) {
      $("#message").html("<h4>Welcome " + username + "</h4>");
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
            $(".close").click();
          } else {
            $("#general_note_error").html("<p>" + general_error_msg + "</p>");
            $("#note_title_error").html("<p>" + note_title_error_msg + "</p>");
          }
        }
      });
    }

  });

  $(".close").on("click", function(e){
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