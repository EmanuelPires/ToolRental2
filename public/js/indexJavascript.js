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
});

function login(url) {
  $.ajax({
    method: "GET",
    url: url
  }).then(function(data) {
    var id = data.FK_CustomerID;
    localStorage.setItem("userID", id);
    console.log(id);

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
      console.log(url);
      $.ajax({
        method: "GET",
        url: url
      }).then(function(data) {
        console.log(data.FK_CustomerID);
        id = data.FK_CustomerID;
        localStorage.setItem("userID", id);
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

$("#searchBtn").on("click", function() {
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

/*

SUBMIT PRODUCT SECTION

NOT WORKING

*/

$("#submitProduct").on("click", function(event) {
  event.preventDefault();
  var id = $(this).data("id");
  var productName = document.getElementById("productName").value;
  var unitPrice = document.getElementById("unitPrice").value;
  var unitsInStock = document.getElementById("unitStock").value;

  var imageURL = document.getElementById("imageURL").value;

  var postProduct = {
    ProductName: productName,
    UnitPrice: unitPrice,
    UnitsInStock: unitsInStock,
    UnitsOnOrder: 0,
    Availability: 1,
    FK_CategoryID: 1,
    image: imageURL
  };

  console.log(id);
  console.log("posting product;" + postProduct);
  debugger;

  $.ajax({
    method: "POST",
    url: "/addproduct/" + id,
    data: postProduct
  }).done(function(data) {
    console.log(id);
    debugger;
    window.location.href = "/myaccount/" + id;
  });
});

/* 




My Account Section




*/

$("#myAccount").on("click", function() {
  var id = localStorage.getItem("userID");
  console.log(id);
  window.location.href = "/myaccount/" + id;
});

/*

Home Button From Profile Page

*/

$("#homeBtn").on("click", function() {
  var id = localStorage.getItem("userID");
  // var id = $(this).data("id");
  console.log(id);

  window.location.href = "/login/" + id;
});

/*

USER UPDATING PROFILE

*/

$("#saveBTN").on("click", function() {
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var fullName = firstName + lastName;
  var phone = document.getElementById("phone").value;
  var street = document.getElementById("street").value;
  var city = document.getElementById("city").value;
  var state = document.getElementById("state").value;
  var country = document.getElementById("country").value;
  var zipcode = document.getElementById("zipcode").value;
  var id = localStorage.getItem("userID");

  var updatedUser =
    "First Name: " +
    firstName +
    "Last Name: " +
    lastName +
    "Full Name: " +
    fullName +
    "Phone: " +
    phone +
    "Address: " +
    street +
    city +
    state +
    country +
    zipcode +
    console.log(updatedUser);

  var UPDATE = {
    Name: fullName,
    Phone: phone,
    Street: street,
    City: city,
    State: state,
    Country: country,
    Zipcode: zipcode
  };
  console.log(UPDATE);
  $.ajax({
    method: "PUT",
    url: "/api/customer/" + id,
    data: UPDATE
  }).done(function() {
    var url = "/myaccount/" + id;

    window.location.href = url;

    // $.ajax({
    //   method: "GET",
    //   url: url
    // }).then(function(data) {
    //   console.log(data.CustomerID);
    //   // id = data.CustomerID;
    //   console.log(id);
    //   //model hide
    //   window.location.href = "/myaccount/" + id;
    // });
  });
  // $.post("/api/register", POST, function(res) {
  //   console.log(res);
  //   window.location.href = "/login/" + res.dataValues.CustomerID;
  // });
});

/*

Order Button Section

*/

$(".orderBtn").on("click", function() {
  event.preventDefault();
  console.log("hello");

  var productid = $(this).data("id");
  var customerid = localStorage.getItem("userID");

  var OrderCost = $(this).data("price");
  var UnitsOnOrder = parseInt($(this).data("order")) + 1;
  var UnitsInStock = parseInt($(this).data("stock")) - 1;
  var OrderQuantity = 1;
  var PickUp = 1;
  console.log(OrderCost);
  var Order = {
    FK_CustomerID: customerid,
    FK_ProductID: productid,
    OrderCost: OrderCost * OrderQuantity,
    OrderQuantity: OrderQuantity,
    PickUp: PickUp
  };
  var Product = {
    ProductID: productid,
    UnitsOnOrder: UnitsOnOrder,
    UnitsInStock: UnitsInStock
  };

  console.log(Order);
  console.log(Product);

  $.ajax({
    method: "POST",
    url: "/api/addorder/",
    data: Order
  }).done(function(data) {
    alert("Thank you for the order");

    $.ajax({
      method: "PUT",
      url: "/api/product/",
      data: Product
    }).done(function(data) {
      window.location.href = "/myaccount/" + customerid;
    });
  });
});
