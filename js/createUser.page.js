/**
 * Created by frederikkevodder on 17/11/2016.
 */


$("#addNewUserButton").on("click", function () {

    var mobilepayIsChosen = 0;
    if ($("input[name=mobilepay]:checked").val()) {
        mobilepayIsChosen = 1;
    }
    var cashIsChosen = 0;
    if ($("input[name=cash]:checked").val()) {
        cashIsChosen = 1;
    }
    var transferIsChosen = 0;
    if ($("input[name=transfer]:checked").val()) {
        transferIsChosen = 1;
    }


    //Create JSON object
    var user = {
        username: $("#newUserUsername").val(),
        password: $("#newUserPassword").val(),
        email: $("#newUserEmail").val(),
        phonenumber: parseInt($("#newUserPhonenumber").val()),
        address: $("#newUserAddress").val(),

        mobilepay: mobilepayIsChosen,
        cash: cashIsChosen,
        transfer: transferIsChosen,
    };



//Create user
    SDK.User.create(user, function (err, data) {

        if (err) {
            window.alert("Noget gik galt, prøv igen.")

            throw err
            location.reload()
        } else{
            window.location.href = "user.html";

        }


    });
});
