console.log("hello from the Javascript file");

var custid;
var url_login;
/*




//Loggin In from Modal




*/
$("#login").on("click", function() {
  var userName = document.getElementById("modalLRInput10").value;
  var password = document.getElementById("modalLRInput11").value;

  console.log(userName + " " + password);

  var url = "/login/" + userName + "/" + password;
  console.log(url);

  custid = login(url);

  // $.ajax({
  //   method: "GET",
  //   url: url
  // }).then(function(data) {
  //   var id = data.FK_CustomerID;
  //   console.log(id);
  //   debugger;
  //   url_login = "/login/" + id;
  //   window.location.href = "/login/" + id;

  //   // $.ajax({
  //   //   method: "GET",
  //   //   url: url_login
  //   // }).then(function(res) {
  //   //   window.location.href = "/login/" + id;
  //   //   return id;
  //   // });
  //   custid = id;
  //   console.log(id);
  //   return id;
  // });
  console.log(custid);
  debugger;
});

function login(url) {
  $.ajax({
    method: "GET",
    url: url
  }).then(function(data) {
    var id = data.FK_CustomerID;
    console.log(id);
    debugger;
    url_login = "/login/" + id;
    window.location.href = "/login/" + id;
    $.ajax({
      method: "GET",
      url: url_login
    }).then(function(res) {
      window.location.href = "/login/" + id;
    });
  });
}

/*


Registering a new customer/renter from Modal.


*/

$("#newUserSubmit").on("click", function() {
  var newUserName = document.getElementById("modalLRInput12").value;
  var password1 = document.getElementById("modalLRInput13").value;
  var password2 = document.getElementById("modalLRInput14").value;
  var name = document.getElementById("modalLRInput15").value;

  console.log(newUserName);

  if (password1 !== password2) {
    alert("passwords don't match!");
  } else {
    var POST = {
      username: newUserName,
      password: password1,
      name: name
    };
    console.log(POST);
    $.ajax({
      method: "POST",
      url: "/api/register",
      data: POST
    }).done(function() {
      var url = "/login/" + newUserName + "/" + password1;
      $.ajax({
        method: "GET",
        url: url
      }).then(function(data) {
        console.log(data.FK_CustomerID);
        id = data.FK_CustomerID;
        console.log(id);
        //model hide
        url_login = "/login/" + id;
        console.log(url_login);
        window.location.href = "/login/" + id;
        $.ajax({
          method: "GET",
          url: url_login
        }).then(function(res) {
          console.log("response" + res.Name);
          window.location.href = "/login/" + id;
        });
      });
    });
    // $.post("/api/register", POST, function(res) {
    //   console.log(res);
    //   window.location.href = "/login/" + res.dataValues.CustomerID;
    // });
  }
});
/*



//Searching for a tool!


*/

$("#searchBtn").on("click", function() {
  var toolSearch = document.getElementById("toolSearch").value;
  // var location = document.getElementById("locationSearch").value;
  var url = "/search/" + toolSearch;

  console.log(toolSearch);
  console.log(url);

  $.ajax({
    method: "GET",
    url: url
  }).then(function(res) {
    console.log(res);
    window.location.href = url;
  });
});

/*

Search For Product While Logged in.

*/

$("#loggedInSearchBtn").on("click", function() {
  var toolSearch = document.getElementById("toolSearch").value;
  // var location = document.getElementById("locationSearch").value;
  var id = $(this).data("id");
  console.log(id);
  var url = "/search/" + id + "/" + toolSearch;

  $.ajax({
    method: "GET",
    url: url
  }).then(function(res) {
    console.log(res);
    window.location.href = url;
  });
});

/* 

ADD PRODUCT SECTION

NOT WORKING

*/

$("#addProductButton").on("click", function() {});

/*

SUBMIT PRODUCT SECTION

NOT WORKING

*/

$("#submitProduct").on("click", function() {
  var productName = document.getElementById("productName").value;
  var unitPrice = document.getElementById("unitPrice").value;
  var unitsInStock = document.getElementById("unitsInStock").value;
  var avaliablity = document.getElementById("radioVal").checked;

  var postProduct = {
    ProductName: productName,
    UnitPrice: unitPrice,
    UnitsInStock: unitsInStock,
    Avaliablity: avaliablity,
    image: image
  };

  $.ajax({
    method: "POST",
    url: "/addproduct/" + id + "/" + image,
    data: postProduct
  }).done(function(data) {
    window.location.href = "/product/" + id;

    // $.ajax({
    //   method: "GET",
    //   url: producturl
    // }).then(function(pdres) {
    //   console.log(pdres);
    //   window.location.href = "/product/" + id;
    // });
  });
});

/*

ORDER BUTTON

NOT WORKING

*/

$("#orderBtn").on("click", function() {
  console.log("hello");
});

$(".orderBtn").on("click", function() {
  console.log("hello");

  var productid = $(this).data("id");

  console.log(productid);
});

/* 




My Account Section




*/

$("#myAccount").on("click", function() {
  var id = $(this).data("id");
  console.log(id);
  window.location.href = "/myaccount/" + id;
});
