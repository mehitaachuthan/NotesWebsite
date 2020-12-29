//anonymous function for whne document loads
$(function() {
  $("#register_form").on("submit", function(e){
    // get form data
    var first_name_input = $("#first_name").val().trim();
    var last_name_input = $("#last_name").val().trim();
    var username_input = $("#username").val().trim();
    var password_input = $("#password").val().trim();
    
    //alright to send form data
    var ready = true;

    $("#general_error").html("");

    if(first_name_input === "") {
      $("#first_name_error").html("<p>First name required</p>");
      ready = false;
    } else {
      $("#first_name_error").html("");
    }

    if(last_name_input === "") {
      $("#last_name_error").html("<p>Last name required</p>");
      ready = false;
    } else {
      $("#last_name_error").html("");
    }

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

    // send post request with data
    // data can be sent as serialized string with = set in it, "datastring="+datastring so that can access
    // key datastring, or can use JSON stringify, just need key value pair
    // also, receive data as variable or json object if complex, like array, and can parse it in function or
    // have ajax parse it by specifiying data type as json at the end
    if(ready) {
      $.ajax({
        type:"POST",
        url: "../server/register.php",
        data: {
          first_name_data : first_name_input,
          last_name_data : last_name_input,
          username_data : username_input,
          password_data : password_input
        },
        success: function(error_statuses) {
          // error_statuses is an array, has been parsed already
          var succeeded = error_statuses[0];
          var general_error_msg = error_statuses[1];
          var first_name_error_msg = error_statuses[2];
          var last_name_error_msg = error_statuses[3]; 
          var username_error_msg = error_statuses[4]; 
          var password_error_msg = error_statuses[5]; 
  
          if(succeeded) {
            $("#register_form").html("<div class='col-sm-offset-4 col-sm-5' id='message'></div>");
            $("#message").html("<h4>Successfully registered! You may go to the front page and login now.</h4>");
          } else {
            $("#general_error").html("<p>" + general_error_msg + "</p>");
            $("#first_name_error").html("<p>" + first_name_error_msg + "</p>");
            $("#last_name_error").html("<p>" + last_name_error_msg + "</p>");
            $("#username_error").html("<p>" + username_error_msg + "</p>");
            $("#password_error").html("<p>" + password_error_msg + "</p>");
          }
        },
        dataType: "json"
      });
    }

    // prevent reloading of page
    e.preventDefault();
  });
});