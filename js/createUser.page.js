/**
 * Created by frederikkevodder on 17/11/2016.
 */

   function createuser(){
    //Create JSON object
var user = {
        username: $("#userUsername").val(),
        password: $("#userPassword").val(),
        email: $("#userEmail").val(),
        phonenumber: $("#userPhonenumber").val(),
        address: $("#userAddress").val(),
    };


//Create user
SDK.User.create(user, function (err, data) {
    if (err) throw err;

});
}