/**
 * Created by frederikkevodder on 17/11/2016.
 * I denne metode opdaterer brugerens sine oplysninger.
 */
$(document).ready(function () {

    $("#updateUserButton").on("click", function () {

        /**
         * Her defineres checkbox for både mobilepay, cash og transfer.
         * Som udgangspunkt er alle checkbox default = 0, hvilket betyder at brugeren ikke tilbyder det.
         * Er checbox checked betyder det, at brugeren tilbyder det, og variablen vil dermed ændres til 1 i databasen.
         * @type {number}
         */
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


        /**
         * Her oprettes Json objekt for den opdaterede bruger, der fanger den nye indtastede data, og gemmer det i objektet.
         * @type {{username: (any), password: (any), email: (any), phonenumber: Number, address: (any), mobilepay: number, cash: number, transfer: number}}
         */
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


        /**
         * Selve metoden, der sender dataen til serveren og gemmer det i databasen.
         */
        SDK.User.update(updatedUser, function (err, data) {
            if (err) {
                window.alert("Noget gik galt, prøv igen.")

                throw err
                location.reload()
            } else {
                window.location.href = "user.html";

            }
        });
    });
});


