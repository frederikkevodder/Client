/**
 * Created by frederikkevodder on 09/11/2016.
 */
$(document).ready(function () {

//Alle annoncer
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
            "<td><button class='reserveAdButton' data-adId=" + ad.adId + ">Reserver</button></td>"+
            "</tr>");
    });

    /**
     * reserve ad
     */

    $(".reserveAdButton").on("click", function(){
        if (confirm("Er du sikker på, at du vil reservere denne bog?") == true) {
        var $reserveAdButton = $(this);

        var adId = {
            id : $reserveAdButton.data("adid")
        };

        //Reserve book
        SDK.Ad.reserve(adId, function (err, data) {
            if (err) throw err;
            location.reload();

        });
        }

    });
});

    //Mine annoncer
    SDK.Ad.getMyAds(function (err, ads) {
        if (err) throw err;

        var $myAdsTableBody = $("#myAdsTableBody");
        ads.forEach(function (ad) {

            function locked(){
                if(ad.locked==1){
                    return "Ja"
                } else{
                    return "Nej"
                }
            }

            $myAdsTableBody.append(
                "<tr>" +
                "<td>" + ad.adId + "</td>" +
                "<td>" + ad.isbn + "</td>" +
                "<td>" + ad.price + "</td>" +
                "<td>" + ad.rating + "</td>" +
                "<td>" + ad.comment + "</td>" +
                "<td>" + locked() +"</td>" +
                "<td><button class='unlockAdButton' data-adId=" + ad.adId + ">Lås op</button></td>"+
                "<td><button class='deleteAdButton' data-adId=" + ad.adId + ">Slet</button></td>"+

                "</tr>");
        });

        $(".unlockAdButton").on("click", function(){

            if (confirm("Er du sikker på, at du vil gøre annoncen aktiv igen?") == true) {

                var unlockAdButton = $(this);


                var adId = {
                    id: unlockAdButton.data("adid")
                };

                //Delete book
                SDK.Ad.unlockAd(adId, function (err, data) {
                    if (err) throw err;
                    location.reload();

                });
            }
        });

        $(".deleteAdButton").on("click", function () {

            if (confirm("Er du sikker på, at du vil slette denne annonce?") == true) {

                var $deleteAdButton = $(this);

                var adId = {
                    id :$deleteAdButton.data("adid")
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
     * Add a new ad
     */
    $("#addNewAdButton").on("click", function () {

        //Show modal
        $('#newAdModal').modal('show');


        $("#createAdButton").on("click", function () {

            //Create JSON object
            var ad = {
                isbn: parseInt($("#bookIsbn").val()),
                price: parseInt($("#newAdPrice").val()),
                rating: parseInt($("#newAdRating").val()),
                comment: $("#newAdComment").val(),

            };


            //Create ad
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


        //Mine reservationer
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
                    "<td><button class='deleteReservationButton' data-adId=" + ad.adId + ">Fjern reservation</button></td>"+

                    "</tr>");
            });

            /**
             * delete reservation
             */

            $(".deleteReservationButton").on("click", function(){
                if (confirm("Er du sikker på, at du vil fjerne din reservervation?") == true) {

                    var deleteReservationButton = $(this);


                    var adId = {
                        id: deleteReservationButton.data("adid")
                    };

                    //Delete book
                    SDK.Ad.deleteReservation(adId, function (err, data) {
                        if (err) throw err;
                        location.reload();

                    });
                }
            });
            });



            $("#logOutLink").on("click", function(){
        SDK.logOut();
        window.location.href = "index.html";
    });
});

