var db = require("../models");

console.log(db);

module.exports = function(app) {
  app.post("/api/register", function(req, res) {
    console.log(req.body);

    db.Customer.create({
      Name: req.body.name
    }).then(function(dbResponse) {
      db.CustomerCredentials.create({
        UserName: req.body.username,
        Password: req.body.password,
        FK_CustomerID: dbResponse.CustomerID
      }).then(function(dbcred) {
        console.log(dbcred);
      });
      console.log(dbResponse);
      res.render("index_login", {
        cust: dbResponse[0]
      });
    });
  });

  app.post("/AddProduct/:id/:image", function(req, res) {
    console.log(req.body);
    db.Product.create({
      Product_Name: req.body.Product_Name,
      SupplierID: req.params.id,
      UnitPrice: req.body.UnitPrice,
      unitsInStock: req.body.unitsInStock,
      unitsOnOrder: 0,
      Availability: req.body.Availability,
      Image: req.params.image
    }).then(function(dbResponse) {
      res.json(dbResponse);
    });
  });
};
