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
      }).then(function(dbcred) {});

      res.render("index_login", {
        cust: dbResponse[0]
      });
    });
  });

  app.post("/AddProduct/:id/:image", function(req, res) {
    console.log(req.body);
    db.Product.create({
      Product_Name: req.body.ProductName,
      SupplierID: req.params.id,
      UnitPrice: req.body.UnitPrice,
      unitsInStock: req.body.UnitsInStock,
      unitsOnOrder: 0,
      Availability: req.body.Availability,
      Image: req.params.image
    }).then(function(dbResponse) {
      res.json(dbResponse);
    });
  });
  app.post("/addorder/:id/:productid", function(req, res) {
    console.log(req.body);
    db.Order.create({
      FK_CustomerID: req.params.id,
      FK_ProductID: req.params.productid,
      OrderDate: req.body.orderdate,
      PickUpDate: req.body.pickupdate,
      OrderQuantity: req.body.orderquantity,
      PickUp: req.body.pickup,
      OrderCost: req.body.ordercost
    }).then(function(dbResponse) {
      res.json(dbResponse);
    });
  });
  // app.get("/search/:productname", function(req, res) {
  //   db.Product.findAll({
  //     where: { Product_Name: req.params.productname },
  //     include: [db.Customer]
  //   }).then(function(dbproducts) {
  //     res.render("index_products", {
  //       product: dbproducts
  //     });
  //   });
  // });
};
