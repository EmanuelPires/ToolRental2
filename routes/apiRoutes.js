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

  app.post("/addproduct/:id/", function(req, res) {
    console.log(req.body);
    db.Product.create({
      Product_Name: req.body.ProductName,
      SupplierID: req.params.id,
      UnitPrice: req.body.UnitPrice,
      UnitsInStock: req.body.UnitsInStock,
      UnitsOnOrder: 0,
      Availability: 1,
      Image: req.body.image,
      FK_CategoryID: 1
    }).then(function(dbResponse) {
      res.render("index_myaccount");
    });
  });
  app.post("/api/addorder/", function(req, res) {
    console.log("/api/addorder/");
    console.log(req.body);
    db.Order.create({
      FK_CustomerID: req.body.FK_CustomerID,
      FK_ProductID: req.body.FK_ProductID,
      OrderQuantity: req.body.OrderQuantity,
      PickUp: req.body.PickUp,
      OrderCost: req.body.OrderCost
    }).then(function(dbResponse) {
      res.render("index_myaccount");
    });
  });

  //Updating the customer Table

  app.put("/api/customer/:id", function(req, res) {
    console.log(req.body);
    db.Customer.update(req.body, {
      where: {
        CustomerID: req.params.id
      }
    }).then(function(dbResponse) {
      //res.json(dbResponse);
      res.render("index_myaccount");
    });
  });

  // Updating the Product Table
  app.put("/api/product/", function(req, res) {
    console.log(req.body);
    db.Product.update(
      {
        UnitsInStock: req.body.UnitsInStock,
        UnitsOnOrder: req.body.UnitsOnOrder
      },
      {
        where: {
          ProductID: req.body.ProductID
        }
      }
    ).then(function(dbResponse) {
      //res.json(dbResponse);
      res.render("index_myaccount");
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
