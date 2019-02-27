var db = require("../models");

console.log(db);

module.exports = function(app) {
  app.get("/login/:username/:password", function(req, res) {
    db.CustomerCredentials.findAll({
      where: {
        UserName: req.params.username,
        Password: req.params.password
      }
    }).then(function(dbResponse) {
      //console.log("res", dbResponse);
      res.json(dbResponse[0]);
    });
  });
  //login section

  app.get("/", function(req, res) {
    db.Product.findAll({}).then(function(dbProduct) {
      res.render("index", {});
    });
  });

  app.get("/login/:id", function(req, res) {
    console.log(req.params.id);
    db.Customer.findOne({
      where: {
        CustomerID: req.params.id
      }
    }).then(function(dbcustomer) {
      //console.log(dbcustomer);
      //res.json(dbcustomer);
      res.render("index_login", {
        customer: dbcustomer
      });
    });
  });

  // Where you can see your profile info

  app.get("/profile/:id", function(req, res) {
    console.log("Testing" + db.Customer);
    db.Customer.findOne({
      where: {
        CustomerID: req.params.id
      }
    }).then(function(dbResponse) {
      //res.json(dbResponse);

      profile = dbResponse;
      console.log(profile.dataValues.Name);
      res.render("profile", {
        profile: dbResponse
      });
    });
  });

  //Where a renter sees the products they're renting

  app.get("/product/:id", function(req, res) {
    db.Product.findAll({
      where: {
        SupplierID: req.params.id
      }
    }).then(function(dbResponse) {
      console.log("customer products: " + dbResponse);
      // res.json(dbResponse);
      res.render("myItems", {
        products: dbResponse[0]
      });
    });
  });

  //Where renter sees what they've rented

  app.get("/order/:id", function(req, res) {
    db.Order.findAll({
      where: {
        FK_CustomerID: req.params.id
      },
      include: [db.Product]
    }).then(function(dbResponse) {
      console.log("Customers orders; " + dbResponse[0]);
      res.json(dbResponse);
      // res.render("myOrders", {
      //   orders: dbResponse[0]
      // });
    });
  });
};
