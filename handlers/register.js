//anonymous function for whne document loads
$(function() {
  $("#register_form").on("submit", function(e){
    // get form data
    var first_name_input = $("#first_name").val();
    var last_name_input = $("#last_name").val();
    var username_input = $("#username").val();
    var password_input = $("#password").val();
    
    // send post request with data
    // data can be sent as serialized string with = set in it, "datastring="+datastring so that can access
    // key datastring, or can use JSON stringify, just need key value pair
    $.ajax({
      type:"POST",
      url: "../server/register.php",
      data: {
        first_name_data : first_name_input,
        last_name_data : last_name_input,
        username_data : username_input,
        password_data : password_input
      },
      success: function(succeeded) {
        $("#register_form").html("<div class='col-sm-offset-4 col-sm-5' id='message'></div>");

        if(succeeded) {
          $("#message").html("<h4>Successfully registered! You may login now.</h4>");
        } else {
          $("#message").html("<h4>Registration failed! Please try again.</h4>");
        }
      }
    });

    // prevent reloading of page
    e.preventDefault();
  });
});