var db = require("../models");

console.log(db);

module.exports = function(app) {
  app.get("/login", function(req, res) {
    console.log(db.CustomerCredentials);
    db.CustomerCredentials.findAll({
      attributes: ["id", "UserName", "Password"]
    }).then(function(dbResponse) {
      console.log("res", dbResponse);
      res.render("index", {
        customer: dbResponse[0]
      });
      // res.json(dbResponse);
    });
  });
};
