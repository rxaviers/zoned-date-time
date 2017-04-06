var ZonedDateTime = require("../src/zoned-date-time");

module.exports = function(chai) {
  var Assertion = chai.Assertion;
  Assertion.addMethod("equalZonedDateTime", function (expected, expectedExtra) {
    var actual = this._obj;
    new Assertion(actual).to.be.instanceof(ZonedDateTime);
    new Assertion(actual.getFullYear()).to.be.equal(expected[0]);
    new Assertion(actual.getMonth()).to.be.equal(expected[1] - 1);
    new Assertion(actual.getDate()).to.be.equal(expected[2]);
    new Assertion(actual.getHours()).to.be.equal(expected[3]);
    new Assertion(actual.getMinutes()).to.be.equal(expected[4]);
    new Assertion(actual.getSeconds()).to.be.equal(expected[5]);
    new Assertion(actual.isDST()).to.be.equal(expectedExtra.isDST);
  });
};

