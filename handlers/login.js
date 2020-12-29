$(function() {
  $("#login_form").on("submit", function(e){
    
    var username_input = $("#username").val().trim();
    var password_input = $("#password").val().trim();

    var ready = true;

    $("#general_error").html("");

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

    if(!(username_input === "" || password_input === "")) {
      ready = true;
    }

    if(ready) {
      $.ajax({
        type: "POST",
        url: "../server/login.php",
        data: {
          username_data : username_input,
          password_data : password_input
        },
        success: function(error_statuses){
          var succeeded = error_statuses[0];
          var general_error_msg = error_statuses[1];
          var username_error_msg = error_statuses[2];
          var password_error_msg = error_statuses[3];

          if(succeeded) {
            $("#login_form").html("<div class='col-sm-offset-4 col-sm-5' id='message'></div>");
            $("#message").html("<h4>Successfully logged in!</h4>");
          } else {
            $("#general_error").html("<p>" + general_error_msg + "</p>");
            $("#username_error").html("<p>" + username_error_msg + "</p>");
            $("#password_error").html("<p>" + password_error_msg + "</p>");
          }
        },
        dataType: "json"
      });
    }

    e.preventDefault();
  });
});