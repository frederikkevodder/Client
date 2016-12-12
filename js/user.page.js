/**
 * Created by frederikkevodder on 09/11/2016.
 */
$(document).ready(function () {

    /**
     * Metode, der henter alle annoncer ind i den tabel, der er oprettet i HTML (admin.html).
     * Der er oprettet en knap inde i tabellen, der er sat op på annoncens ID.
     * Den række, hvis knap man trykker på, vil slette den annonce med det tilhørende ID.
     */
    SDK.Ad.getAll(function (err, ads) {
        if (err) throw err;

        var $adTableBody = $("#adTableBody");
        ads.forEach(function (ad) {

            $adTableBody.append(
                "<tr>" +
                "<td>" + ad.isbn + "</td>" +
                "<td>" + ad.bookTitle + "</td>" +
                "<td>" + ad.bookAuthor + "</td>" +
                "<td>" + ad.bookEdition + "</td>" +
                "<td>" + ad.price + "</td>" +
                "<td>" + ad.rating + "</td>" +
                "<td><button class='reserveAdButton' data-adId=" + ad.adId + ">Reserver</button></td>" +
                "</tr>");
        });

        /**
         * Brugeren reserverer en annonce med denne metode, når der trykkes på knappen
         */

        $(".reserveAdButton").on("click", function () {
            if (confirm("Er du sikker på, at du vil reservere denne bog?") == true) {
                var $reserveAdButton = $(this);

                var adId = {
                    id: $reserveAdButton.data("adid")
                };

                /**
                 * Her sendes dataen til databasen.
                 */
                SDK.Ad.reserve(adId, function (err, data) {
                    if (err) throw err;
                    location.reload();

                });
            }

        });
    });

    /**
     * Metode, der udskriver alle de annoncer, der er tilknyttet, den bruger, der er logget ind.
     */
    SDK.Ad.getMyAds(function (err, ads) {
        if (err) throw err;

        var $myAdsTableBody = $("#myAdsTableBody");
        ads.forEach(function (ad) {

            function locked() {
                if (ad.locked == 1) {
                    return "Ja"
                } else {
                    return "Nej"
                }
            }

            /**
             * De atributter fra databasen, der skal hentes og vises i tabellen, herunder er der også oprettet to knapper.
             */
            $myAdsTableBody.append(
                "<tr>" +
                "<td>" + ad.adId + "</td>" +
                "<td>" + ad.isbn + "</td>" +
                "<td>" + ad.price + "</td>" +
                "<td>" + ad.rating + "</td>" +
                "<td>" + ad.comment + "</td>" +
                "<td>" + locked() + "</td>" +
                "<td><button class='unlockAdButton' data-adId=" + ad.adId + ">Lås op</button></td>" +
                "<td><button class='deleteAdButton' data-adId=" + ad.adId + ">Slet</button></td>" +

                "</tr>");
        });

        /**
         * Når der trykkes på denne knap, blive annoncen aktiv igen, og kan reserveres på ny.
         */
        $(".unlockAdButton").on("click", function () {

            if (confirm("Er du sikker på, at du vil gøre annoncen aktiv igen?") == true) {

                var unlockAdButton = $(this);


                var adId = {
                    id: unlockAdButton.data("adid")
                };

                SDK.Ad.unlockAd(adId, function (err, data) {
                    if (err) throw err;
                    location.reload();

                });
            }
        });

        /**
         * Når der trykkes på denne knap, blive annoncen slettet fra databasen.
         */
        $(".deleteAdButton").on("click", function () {

            if (confirm("Er du sikker på, at du vil slette denne annonce?") == true) {

                var $deleteAdButton = $(this);

                var adId = {
                    id: $deleteAdButton.data("adid")
                };
                //Delete user

                SDK.Ad.deleteAd(adId, function (err, data) {
                    if (err) throw err;
                    location.reload();
                });
            }

        });
    });


    /**
     * Opretter en ny annonce.
     */
    $("#addNewAdButton").on("click", function () {

        /**
         * Opretter et modal, der kommer frem, når man trykker på knappen "opret annonce".
         * I denne modal udfylder man info om annoncen.
         */
        $('#newAdModal').modal('show');


        $("#createAdButton").on("click", function () {

            /**
             * Opretter her Json objekt for annoncen.
             * @type {{isbn: Number, price: Number, rating: Number, comment: (any)}}
             */
            var ad = {
                isbn: parseInt($("#bookIsbn").val()),
                price: parseInt($("#newAdPrice").val()),
                rating: parseInt($("#newAdRating").val()),
                comment: $("#newAdComment").val(),

            };


            /**
             * Selve metoden, der opretter annoncen og sender dataen til databasen.
             * Lykkes det lukker modal efterfølgende.
             */
            SDK.Ad.create(ad, function (err, data) {

                if (err) {
                    window.alert("Noget gik galt, prøv igen.")
                    throw err
                } else {
                    $("#newAdModal").modal("hide");
                    location.reload();
                }
            });

        });
    });


    /**
     * Metode, der udskriver alle de annoncer, brugeren, der er logget ind, har reserveret, den bruger, der er logget ind, har reserveret.
     */
    SDK.Ad.myReservations(function (err, ads) {
        if (err) throw err;

        var $myReservationsTableBody = $("#myReservationsTableBody");
        ads.forEach(function (ad) {

            $myReservationsTableBody.append(
                "<tr>" +
                "<td>" + ad.adId + "</td>" +
                "<td>" + ad.timestamp + "</td>" +
                "<td>" + ad.bookIsbn + "</td>" +
                "<td>" + ad.userUsername + "</td>" +
                "<td>" + ad.userPhonenumber + "</td>" +
                "<td><button class='deleteReservationButton' data-adId=" + ad.adId + ">Fjern reservation</button></td>" +

                "</tr>");
        });

        /**
         * Sletter reservation
         */
        $(".deleteReservationButton").on("click", function () {
            if (confirm("Er du sikker på, at du vil fjerne din reservervation?") == true) {

                var deleteReservationButton = $(this);


                var adId = {
                    id: deleteReservationButton.data("adid")
                };

                SDK.Ad.deleteReservation(adId, function (err, data) {
                    if (err) throw err;
                    location.reload();

                });
            }
        });
    });


    /**
     * Logud metode, der sender brugeren til startsiden.
     */
    $("#logOutLink").on("click", function () {

        SDK.logout(function (err) {

            if (err) {
                window.alert("Noget gik galt, prøv igen.")
                throw err
            } else {
                window.location.href = "index.html";

            }
        });

    });
});

