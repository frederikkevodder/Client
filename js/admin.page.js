/**
 * Kode der er inde i document.ready metoden, vil kun køre når DOM er klar.
 */
$(document).ready(function () {


    /**
     * Metode, der henter alle annoncer ind i den tabel, der er oprettet i HTML (admin.html).
     */
    SDK.Ad.getAll(function (err, ads) {
        if (err) throw err;

        var $adsTableBody = $("#adsTableBody");
        ads.forEach(function (ad) {

            function locked() {
                if (ad.locked == 1) {
                    return "Ja"
                } else {
                    return "Nej"
                }
            }

            /**
             * Vælger her hvilke atributter fra databasen, der skal hentes og vises i tabellen.
             */
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

    /**
     * Henter alle bøger og gør det samme som ovenstående.
     * I denne metode er der dog oprettet en knap inde i tabellen også. Knappen er sat op på bogens ISBN nummer.
     * Den række, hvis knap man trykker på, vil slette den bog med det tilhørende ISBN nummer.
     */
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
         * Selve funktionen, der sletter bogen, når der trykkes på knappen.
         */
        $(".deleteBookButton").on("click", function () {
            if (confirm("Er du sikker på, at du vil slette denne bog?") == true) {

                var $deleteBookButton = $(this);

                var isbn = {
                    isbn: $deleteBookButton.data("isbn")
                };

                SDK.Book.delete(isbn, function (err, data) {
                    if (err) throw err;
                    location.reload();
                });
            }

        });
    });


    /**
     * Henter alle brugere ned i den tabel, der er oprettet i HTML.
     */
    SDK.User.getAll(function (err, users) {
        if (err) throw err;

        var $usersTableBody = $("#usersTableBody");

        users.forEach(function (user) {
            function mobilepay() {
                if (user.mobilepay == 1) {
                    return "Ja"
                } else {
                    return "Nej"
                }
            }

            function cash() {
                if (user.cash == 1) {
                    return "Ja"
                } else {
                    return "Nej"
                }
            }

            function transfer() {
                if (user.transfer == 1) {
                    return "Ja"
                } else {
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
                "<td><button class='deleteUserButton' data-userId=" + user.userId + ">Slet</button></td>" +

                "</tr>");


        });

        $(".deleteUserButton").on("click", function () {

            if (confirm("Er du sikker på, at du vil slette denne bruger?") == true) {

                var $deleteUserButton = $(this);

                var userId = {
                    id: $deleteUserButton.data("userid")
                };
                //Delete user

                SDK.User.delete(userId, function (err, data) {
                    if (err) throw err;
                    location.reload();
                });
            }

        });

    });

    /**
     * Opretter en ny bog.
     */

    $("#addNewBookButton").on("click", function () {

        /**
         * Opretter et modal, der kommer frem, når man trykker på knappen "opret bog".
         * I denne modal udfylder man info om bogen.
         */
        $('#newBookModal').modal('show');


        $("#createBookButton").on("click", function () {

            /**
             * Opretter her Json objekt for bogen.
             * @type {{title: (any), author: (any), edition: (any), isbn: Number}}
             */
            var book = {
                title: $("#bookTitle").val(),
                author: $("#bookAuthor").val(),
                edition: $("#bookEdition").val(),
                isbn: parseInt($("#bookIsbn").val()),
            };


            /**
             * Selve metoden, der opretter bogen og sender dataen til databasen.
             * Lykkes det lukker modal efterfølgende.
             */
            SDK.Book.create(book, function (err, data) {

                if (err) {
                    window.alert("Noget gik galt, prøv igen.")
                    throw err
                } else {
                    $("#newBookModal").modal("hide");
                    location.reload();
                }
            });

        });

    });


    /**
     * Logud metode, der sender admin til startsiden.
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




