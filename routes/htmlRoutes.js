var db = require("../models");

console.log(db);

module.exports = function(app) {
  //login section

  app.get("/login", function(req, res) {
    db.CustomerCredentials.findAll({}).then(function(dbResponse) {
      console.log("res", dbResponse);
      res.render("index", {
        customer: dbResponse[0]
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
        id: req.params.id
      }
    }).then(function(dbResponse) {
      console.log("Customers orders; " + dbResponse);
      res.render("myOrders", {
        orders: dbResponse
      });
    });
  });
};
