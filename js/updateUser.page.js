/**
 * Created by frederikkevodder on 17/11/2016.
 */
$(document).ready(function () {

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
        var updatedUser = {
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
        SDK.User.update(updatedUser, function (err, data) {
            if (err) {
                window.alert("Noget gik galt, prøv igen.")

                throw err
                location.reload()
            } else{
                window.location.href = "user.html";

            }
        });
    });
});


