/**
 * Created by frederikkevodder on 17/11/2016.
 */


$("#updateUserButton").on("click", function () {

    var mobilepayIsChosen = 0;
    if ($("input[name=updatemobilepay]:checked").val()) {
        mobilepayIsChosen = 1;
    }
    var cashIsChosen = 0;
    if ($("input[name=updatecash]:checked").val()) {
        cashIsChosen = 1;
    }
    var transferIsChosen = 0;
    if ($("input[name=updatetransfer]:checked").val()) {
        transferIsChosen = 1;
    }


    //Create JSON object
    var user = {
        username: $("#updateUserUsername").val(),
        password: $("#updateUserPassword").val(),
        email: $("#updateUserEmail").val(),
        phonenumber: parseInt($("#updateUserPhonenumber").val()),
        address: $("#updateUserAddress").val(),

        mobilepay: mobilepayIsChosen,
        cash: cashIsChosen,
        transfer: transferIsChosen,
    };



//Update user
    SDK.User.update(user, function (err, data) {
        if (err) throw err;

        window.location.href = "user.html";
    });
});