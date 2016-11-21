/**
 * Created by frederikkevodder on 09/11/2016.
 */
$(document).ready(function () {

//Alle annoncer
SDK.Ad.getAll(function (err, ads) {
    if (err) throw err;

    var $adsTableBody = $("#adTableBody");
    ads.forEach(function (ad) {

        $adsTableBody.append(
            "<tr>" +
            "<td>" + ad.isbn + "</td>" +
            "<td>" + ad.bookTitle + "</td>" +
            "<td>" + ad.bookAuthor + "</td>" +
            "<td>" + ad.bookEdition + "</td>" +
            "<td>" + ad.price + "</td>" +
            "<td>" + ad.rating + "</td>" +
            "<td><button class='getAdButton' data-adId=" + ad.adId + ">Vis mere</button></td>"+
            "</tr>");
    });

    //Mine annoncer
    SDK.Ad.getMyAds(function (err, ads) {
        if (err) throw err;

        var $adsTableBody = $("#myAdsTableBody");
        ads.forEach(function (ad) {

            $adsTableBody.append(
                "<tr>" +
                "<td>" + ad.isbn + "</td>" +
                "<td>" + ad.bookTitle + "</td>" +
                "<td>" + ad.bookAuthor + "</td>" +
                "<td>" + ad.bookEdition + "</td>" +
                "<td>" + ad.price + "</td>" +
                "<td>" + ad.rating + "</td>" +
                "<td>" + ad.deleted +"</td>" +
                "<td>" + ad.locked +"</td>" +
                "</tr>");
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
                if (err) throw err;

                $("#newAdModal").modal("hide");
                location.reload();
            });

        });

        /**
         * Show ad
         */

        $(".getAdButton").on("click", function(){
            var adId = $(this);

            //Show modal
           // $('#getAdModal').modal('show');

            //Delete book
            SDK.Ad.delete(adId, function (err) {
                if (err) throw err;
                location.reload();
            });
            });



            $("#logOutLink").on("click", function(){
        SDK.logOut();
        window.location.href = "index.html";
    });
});
});
});
});

