//execute when account page loads
$(function(){
  //immediately receive user details to display, specify action to do
  $.ajax({
    type: "POST",
    url: "../server/account.php",
    data: {
      action_to_take : "receive_username"
    },
    success: function(username) {
      $("#message").html("<h4>Welcome " + username + "</h4>");
    }
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