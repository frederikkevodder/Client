$(document).ready(function (){


    //Fires on page-load
    SDK.Ad.getAll(function (err, ads) {
        if (err) throw err;

        var $adsTableBody = $("#adsTableBody");
        ads.forEach(function (ad) {

            $adsTableBody.append(
                "<tr>" +
                "<td>" + ad.isbn + "</td>" +
                "<td>" + ad.bookTitle + "</td>" +
                "<td>" + ad.bookAuthor + "</td>" +
                "<td>" + ad.bookEdition + "</td>" +
                "<td>" + ad.price + "</td>" +
                "<td>" + ad.rating + "</td>" +
                "<td>" + ad.comment + "</td>" +
                "<td>" + ad.deleted + "</td>" +
                "<td>" + ad.locked + "</td>" +
                "<td><button class=" +"deleteAdButton" +">Slet</button>"+ "</td>"+
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
                "<td><button class='deleteBookButton' data-ISBN=" + book.isbn + ">Slet</button></td>"+
            "</tr>");
        });


            });




    //Fires on page-load
    SDK.User.getAll(function (err, users) {
        if (err) throw err;

        var $usersTableBody = $("#usersTableBody");
        users.forEach(function (user) {

            $usersTableBody.append(
                "<tr>" +
                "<td>" + user.userId + "</td>" +
                "<td>" + user.username + "</td>" +
                "<td>" + user.password + "</td>" +
                "<td>" + user.email + "</td>" +
                "<td>" + user.phonenumber + "</td>" +
                "<td>" + user.address + "</td>" +
                "<td>" + user.mobilepay + "</td>" +
                "<td>" + user.cash + "</td>" +
                "<td>" + user.transfer + "</td>" +
                "<td><button class='deleteUserButton' data-userId=" + user.userId + ">Slet</button></td>"+
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


/**
 * Delete a Book
 */

$(".deleteBookButton").on("click", function(){
    var ISBN = $(this);

        //Delete book
        SDK.Book.delete(ISBN, function (err, data) {
            if (err) throw err;
            location.reload();
        });




    /**
     * Delete a user
     */

    $(".deleteUserButton").on("click", function(){
        var userId = $(this);

            //Delete user
            SDK.User.delete(userId, function (err, data) {
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




