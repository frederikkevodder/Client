/**
 * Metode for login.
 */

$(document).ready(function () {

    /**
     * Metode der kører, når der trykkes på kanppen "login".
     */
    $("#loginButton").on("click", function (e) {
        e.preventDefault();

        /**
         * Opretter Json objekt for brugernavn og kodeord.
         * @type {any}
         */
        var un = $("#inputUsername").val();
        var pw = $("#inputPassword").val();

        SDK.login(un, pw, function (err, data) {

            /**
             * Ved fejl
             */
            if (err) {
                window.alert("Noget gik galt, prøv igen.")
                location.reload()

                return $("#loginForm").find(".form-group").addClass("has-error");
            }

            /**
             * Ved succes
             */
            $("#loginForm").find(".form-group").addClass("has-success");

            /**
             * Logger admin ind, som har type=1, sendes vedkommende over til den admin panel.
             * Logger en bruger ind, som default oprettes med type=0, og desuden ikke kan være andet,
             * sendes vedkommende til user panel.
             */
            if (data.type == 1) {
                window.location.href = "admin.html";

            } else {
                window.location.href = "user.html";
            }

        });

    });

});
