
$(document).ready(function () {

  $("#loginButton").on("click", function(e){
    e.preventDefault();

    var un = $("#inputUsername").val();
    var pw = $("#inputPassword").val();

    SDK.login(un, pw, function(err, data){

      //On wrong credentials
      if(err) {
        return $("#loginForm").find(".form-group").addClass("has-error");
      }

      //Login OK!
      $("#loginForm").find(".form-group").addClass("has-success");

        if(data.type == 1){
          window.location.href = "admin.html";

        } else {
          window.location.href = "user.html";
        }




    });

  });

});
