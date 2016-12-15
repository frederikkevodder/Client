/**
 * Created by frederikkevodder on 17/11/2016.
 */

/**
 * I denne metode opretter gæsten sig som en ny bruger.
 */
$(document).ready(function () {


    $("#addNewUserButton").on("click", function () {

        /**
         * Her defineres checkbox for både mobilepay, cash og transfer.
         * Som udgangspunkt er alle checkbox default = 0, hvilket betyder at brugeren ikke tilbyder det.
         * Er checbox checked betyder det, at brugeren tilbyder det, og variablen vil dermed ændres til 1 i databasen.
         * @type {number}
         */
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


        /**
         * Her oprettes Json objekt for den oprettede bruger, der fanger den indtastede data, og gemmer det i objektet.
         * @type {{username: (any), password: (any), email: (any), phonenumber: Number, address: (any), mobilepay: number, cash: number, transfer: number}}
         */
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


        /**
         * Selve metoden, der sender dataen til serveren og gemmer det i databasen.
         */
        SDK.User.create(user, function (err, data) {

            if (err) {
                window.alert("Noget gik galt, prøv igen.")

                throw err
                location.reload()
            } else {
                window.location.href = "login.html";

            }


        });
    });
});
