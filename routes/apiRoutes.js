var db = require("../models");

console.log(db);

module.exports = function(app) {

    app.post("/register", function(req,res){
        console.log(req.body);
        db.Customer.create({
            Name: req.body.Name,
            Phone: req.body.Phone,
            Street: req.body.Street,
            City: req.body.City,
            State: req.body.State,
            Country: req.body.Country,
            Zipcode: req.body.Zipcode
        })
        .then(function(dbResponse){
            res.json(dbResponse);
        });
    });

    app.post("/AddProduct/:id/:image", function(req,res){
        console.log(req.body);
        db.Product.create({
            Product_Name: req.body.Product_Name,
            SupplierID: req.params.id,
            UnitPrice: req.body.UnitPrice,
            unitsInStock: req.body.unitsInStock,
            unitsOnOrder: 0,
            Availability: req.body.Availability,
            Image: req.params.image
        })
        .then(function(dbResponse){
            res.json(dbResponse);
        });
    });
}