console.log("hello from the Javascript file");

var id;
var url_login;

document.getElementById("login").addEventListener("click", function() {
  var userName = document.getElementById("modalLRInput10").value;
  var password = document.getElementById("modalLRInput11").value;

  console.log(userName + " " + password);

  var url = "/login/" + userName + "/" + password;
  console.log(url);

  //model hide

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
    $.ajax({
      method: "GET",
      url: url_login
    }).then(function(res) {
      console.log("response" + res.Name);
      window.location.href = "/login/" + id;
    });
  });
});

document.getElementById("newUserSubmit").addEventListener("click", function() {
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
    $.post("/api/register", POST, function(res) {
      console.log(res);
      window.location.href = "/login/" + res.dataValues.CustomerID;
    });
  }
});
