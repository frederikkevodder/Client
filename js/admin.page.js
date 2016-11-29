$(document).ready(function () {


    //Fires on page-load
    SDK.Ad.getAll(function (err, ads) {
        if (err) throw err;

        var $adsTableBody = $("#adsTableBody");
        ads.forEach(function (ad) {

            function locked(){
                if(ad.locked==1){
                    return "Ja"
                } else{
                    return "Nej"
                }
            }

            $adsTableBody.append(
                "<tr>" +
                "<td>" + ad.isbn + "</td>" +
                "<td>" + ad.bookTitle + "</td>" +
                "<td>" + ad.bookAuthor + "</td>" +
                "<td>" + ad.bookEdition + "</td>" +
                "<td>" + ad.price + "</td>" +
                "<td>" + ad.rating + "</td>" +
                "<td>" + locked() + "</td>" +
                "</tr>");
        });


    });

    //Fires on page-load
    SDK.Book.getAll(function (err, books) {
        if (err) throw err;


        var $booksTableBody = $("#booksTableBody");
        books.forEach(function (book) {

            $booksTableBody.append(
                "<tr>" +
                "<td>" + book.title + "</td>" +
                "<td>" + book.author + "</td>" +
                "<td>" + book.edition + "</td>" +
                "<td>" + book.isbn + "</td>" +
                "<td><button class='deleteBookButton' data-isbn=" + book.isbn + ">Slet</button></td>" +
                "</tr>");
        });

        /**
         * Delete a Book
         */
        $(".deleteBookButton").on("click", function () {
            var $deleteBookButton = $(this);

            var isbn = {
                isbn :$deleteBookButton.data("isbn")
            };
            //Delete book

            SDK.Book.delete(isbn, function (err, data) {
                if (err) throw err;
                location.reload();
            });


        });


    });


    //Fires on page-load
    SDK.User.getAll(function (err, users) {
        if (err) throw err;

        var $usersTableBody = $("#usersTableBody");

        users.forEach(function (user) {
            function mobilepay(){
                if(user.mobilepay==1){
                    return "Ja"
                } else{
                    return "Nej"
                }
            }
            function cash(){
                if(user.cash==1){
                    return "Ja"
                } else{
                    return "Nej"
                }
            }
            function transfer(){
                if(user.transfer==1){
                    return "Ja"
                } else{
                    return "Nej"
                }
            }

            $usersTableBody.append(
                "<tr>" +
                "<td>" + user.userId + "</td>" +
                "<td>" + user.username + "</td>" +
                "<td>" + user.password + "</td>" +
                "<td>" + user.email + "</td>" +
                "<td>" + user.phonenumber + "</td>" +
                "<td>" + user.address + "</td>" +
                "<td>" + mobilepay() + "</td>" +
                "<td>" + cash() + "</td>" +
                "<td>" + transfer() + "</td>" +
                "</tr>");


        });

    });


    var currentUser = SDK.User.current();
    $("#currentUserName").text(currentUser.username);


    /**
     * Add a new Book
     */

    $("#addNewBookButton").on("click", function () {

        //Show modal
        $('#newBookModal').modal('show');


        $("#createBookButton").on("click", function () {

            //Create JSON object
            var book = {
                title: $("#bookTitle").val(),
                author: $("#bookAuthor").val(),
                edition: $("#bookEdition").val(),
                isbn: parseInt($("#bookIsbn").val()),
            };


            //Create book
            SDK.Book.create(book, function (err, data) {
                if (err) throw err;

                $("#newBookModal").modal("hide");
                location.reload();
            });

        });

    });


    $("#logOutLink").on("click", function () {
        SDK.logOut();
        window.location.href = "index.html";
    });

});




