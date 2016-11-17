function loadall() {

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
                "<td>" + user.userid + "</td>" +
                "<td>" + user.username + "</td>" +
                "<td>" + user.password + "</td>" +
                "<td>" + user.email + "</td>" +
                "<td>" + user.phonenumber + "</td>" +
                "<td>" + user.adress + "</td>" +
                "<td>" + user.mobilepay + "</td>" +
                "<td>" + user.cash + "</td>" +
                "<td>" + user.transfer + "</td>" +
                "</tr>");
        });

    });

}

  var currentUser = SDK.User.current();
  $("#currentUserName").text(currentUser.username);

  /**
   * Add a new Book
   */

  function createbook() {


      $("#addNewBookButton").on("click", function () {

          //Show modal
          $('#newBookModal').modal('show');


          $("#createBookButton").on("click", function () {

              //Create JSON object
              var book = {
                  title: $("#bookTitle").val(),
                  author: $("#bookAuthor").val(),
                  edition: $("#bookEdition").val(),
                  isbn: $("#bookIsbn").val(),
              };


              //Create book
              SDK.Book.create(book, function (err, data) {
                  if (err) throw err;

                  $("#newBookModal").modal("hide");
              });

          });

      });
  }

  /**
   * Add a new User
   */
  $("#addNewUserButton").on("click", function () {

  });

  $("#logOutLink").on("click", function(){
    SDK.logOut();
    window.location.href = "index.html";
  });


