var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("GET /profile/1", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find one customer", function(done) {
    // Add some examples to the db to test with
    db.Customer.bulkCreate([
      { Name: "First Example", Phone: "Phone Number 1" }
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/profile/1").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        console.log("hello" + responseBody);

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody).to.be.an("object");

        expect(responseBody[0])
          .to.be.an("object")
          .that.includes({
            Name: "First Example",
            Phone: "Phone Number 1"
          });

        // expect(responseBody[1])
        //   .to.be.an("object")
        //   .that.includes({
        //     Name: "Second Example",
        //     Phone: "Phone Number 2"
        //   });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});
