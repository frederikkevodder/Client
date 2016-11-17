/**
 * Created by frederikkevodder on 09/11/2016.
 */
$(document).ready(function () {

//Fires on page-load
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
            "</tr>");
    });


    /**
     * Add a new ad
     */
    $("#addNewAdButton").on("click", function () {

        //Show modal
        $('#newAdModal').modal('show');

        //Fetch publishers, and set to DOM
        SDK.Publisher.getAll(function (err, publishers) {
            if (err) throw err;

            var $publishersRadio = $("#publishersRadio");
            publishers.forEach(function (publisher, i) {

                $publishersRadio.append(
                    '<div class="radio">' +
                    '<label>' +
                    '<input type="radio" name="publisherRadios" id="optionsRadios' + i + '" value="' + publisher.id + '">' +
                    publisher.name +
                    '</label>' +
                    '</div>'
                );

            });

        });


        $("#createAdButton").on("click", function(){

            //Create JSON object
            var ad = {
                adid: $("#adAdid").val(),
                userid: $("#adUserid").val(),
                isbn: $("#adIsbn").val(),
                price: $("#adPrice").val(),
                rating: $("#adRating").val(),
                comment: $("#adComment").val(),
                deleted: $("#adDeleted").val(),
                locked: $("#adLocked").val(),
            };


            //Create book
            SDK.Ad.create(ad, function(err, data){
                if(err) throw err;

                $("#newAdModal").modal("hide");
            });

        });

    });

    $("#logOutLink").on("click", function(){
        SDK.logOut();
        window.location.href = "index.html";
    });
});
});