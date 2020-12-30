$(function() {
  //Handle login form submission
  $("#login_form").on("submit", function(e){
    
    //get username and password from fields
    var username_input = $("#username").val().trim();
    var password_input = $("#password").val().trim();

    //whether ok to send data to server, both username and password exist
    var ready = true;

    //general error field empty
    $("#general_error").html("");

    //username or password empty means error, not ready to send data to server yet
    if(username_input === "") {
      $("#username_error").html("<p>Username required</p>");
      ready = false;
    } else {
      $("#username_error").html("");
    }

    if(password_input === "") {
      $("#password_error").html("<p>Password required</p>");
      ready = false;
    } else {
      $("#password_error").html("");
    }

    //send post request
    if(ready) {
      $.ajax({
        type: "POST",
        url: "../server/login.php",
        data: {
          username_data : username_input,
          password_data : password_input
        },
        success: function(error_statuses){
          //unwrap returned data from array, json parsed already since dataType specified
          var succeeded = error_statuses[0];
          var general_error_msg = error_statuses[1];
          var username_error_msg = error_statuses[2];
          var password_error_msg = error_statuses[3];

          //display errors if not successful, otherwise go to next page
          if(succeeded) {
            window.location.href="http://notes.local/pages/account_page.html";
          } else {
            $("#general_error").html("<p>" + general_error_msg + "</p>");
            $("#username_error").html("<p>" + username_error_msg + "</p>");
            $("#password_error").html("<p>" + password_error_msg + "</p>");
          }
        },
        dataType: "json"
      });
    }

    //prevent default submission behaviour of refreshing
    e.preventDefault();
  });
});