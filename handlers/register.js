//anonymous function for whne document loads
$(function() {
  $("#register_form").on("submit", function(e){
    var data_input = $("#register_form").serialize();
    console.log(data_input);

    $.ajax({
      type:"POST",
      url: "../server/register.php",
      data: data_input,
      success: function() {
        $("#register_form").html("<div class='col-sm-offset-4 col-sm-5' id='message'></div>");
        $("#message").html("<h4>Successfully registered! You may log in now.</h4>");
      }
    });

    e.preventDefault();
  });
});