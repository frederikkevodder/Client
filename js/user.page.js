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
            "<td>" + ad.adid +"</td>" +
            "<td>" + ad.userid +"</td>" +
            "<td>" + ad.isbn +"</td>" +
            "<td>" + ad.price +"</td>" +
            "<td>" + ad.rating +"</td>" +
            "<td>" + ad.comment +"</td>" +
            "<td>" + ad.deleted +"</td>" +
            "<td>" + ad.locked +"</td>" +
            "<td><button class=" +"getAdButton" +">Vis mere</button>"+ "</td>"+

            "</tr>");
    });

    //Mine annoncer
    SDK.Ad.getMyAds(function (err, ads) {
        if (err) throw err;

        var $adsTableBody = $("#myAdsTableBody");
        ads.forEach(function (ad) {

            $adsTableBody.append(
                "<tr>" +
                "<td>" + ad.adid +"</td>" +
                "<td>" + ad.userid +"</td>" +
                "<td>" + ad.isbn +"</td>" +
                "<td>" + ad.price +"</td>" +
                "<td>" + ad.rating +"</td>" +
                "<td>" + ad.comment +"</td>" +
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


            //Create book
            SDK.Ad.create(ad, function (err, data) {
                if (err) throw err;

                $("#newAdModal").modal("hide");
                location.reload();
            });

        });

    });
        /**
         * Show ad
         */




    $("#logOutLink").on("click", function(){
        SDK.logOut();
        window.location.href = "index.html";
    });
});
});
});
