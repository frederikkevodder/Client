/**
 * Created by frederikkevodder on 17/11/2016.
 * Her hentes alle bøger og vises i den oprettede HTML tabel, når DOM er klar.
 */

$(document).ready(function () {


    SDK.Book.getAll(function (err, data) {
        if (err) throw err;


        var $booksTableBody = $("#booksTableBody");
        data.forEach(function (book, i) {

            $booksTableBody.append(
                "<tr>" +
                "<td>" + book.title + "</td>" +
                "<td>" + book.author + "</td>" +
                "<td>" + book.edition + "</td>" +
                "<td>" + book.isbn + "</td>" +
                "</tr>");
        });

    });
});


