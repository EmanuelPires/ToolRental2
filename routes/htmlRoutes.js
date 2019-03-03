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
      // console.log(dbcustomer);
      // res.json(dbcustomer);
      res.render("index_login", {
        customer: dbcustomer
      });
    });
  });

  // Where you can see your profile info

  app.get("/myaccount/:id", function(req, res) {
    db.Customer.findAll({
      where: {
        CustomerID: req.params.id
      },
      include: [
        {
          model: db.Order,
          required: false
        },
        {
          model: db.Product,
          required: false
        }
      ]
    }).then(function(dbResponse) {
      //res.json(dbResponse);

      profile = dbResponse;
      // console.log(profile);
      //console.log(dataValues.CustomerID);

      // console.log(profile[0].dataValues.Products[0].dataValues.Product_Name);
      //console.log(profile[0].profile.dataValues..Products.dataValues[0].Product_Name);
      // res.json(dbResponse[0].dataValues.Name);
      console.log(profile[0].dataValues.CustomerID);
      // console.log(profile[0].dataValues.Orders[0].dataValues.OrderID);
      console.log(dbResponse[0].dataValues);
      res.render("index_myaccount", {
        profile: dbResponse[0],
        Product: profile[0].dataValues.Products,
        Order: profile[0].dataValues.Orders
      });
    });
  });

  /*
  
  WHERE THE RENTER SEES WHAT THEY'RE OFFERING

  */

  app.get("/product/:id", function(req, res) {
    db.Product.findAll({
      where: {
        SupplierID: req.params.id
      },
      include: [db.Customer]
    }).then(function(dbResponse) {
      console.log("customer products: " + dbResponse);
      // res.json(dbResponse);
      res.render("myItems", {
        products: dbResponse[0]
      });
    });
  });

  /*
  
  Where renter sees what they've rented

  */

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

  app.get("/search/:productname", function(req, res) {
    db.Product.findAll({
      where: { Product_Name: req.params.productname },
      include: [db.Customer]
    }).then(function(dbproducts) {
      // console.log(dbproducts[0].dataValues);
      // res.json(dbproducts);
      console.log(dbproducts);
      res.render("index_products", {
        product: dbproducts
      });
    });
  });

  app.get("/search/:id/:productname", function(req, res) {
    db.Product.findAll({
      where: { Product_Name: req.params.productname },
      include: [db.Customer]
    }).then(function(dbproducts) {
      // console.log(dbproducts[0].dataValues);
      // res.json(dbproducts);
      res.render("index_login_products", {
        product: dbproducts
      });
    });
  });
};
