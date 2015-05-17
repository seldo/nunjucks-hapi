var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

// Basic sync functions

lab.experiment('basic functions', function () {

  var NunjucksHapi = require('../../index');

  lab.before(function (done) {

    NunjucksHapi.configure('../views/');

    done();
  });

  lab.test('Compile on a string should return a function', function (done) {

    var renderer = NunjucksHapi.compile('some string');
    Code.expect(renderer).function();
    var rendered = renderer();
    Code.expect(rendered).equal('some string');

    done();
  });

});

// Basic async function

lab.experiment('basic async functions', function () {

  var NunjucksHapi = require('../../index');

  lab.before(function (done) {

    NunjucksHapi.configure('../views/');
    done();
  });

  lab.test('Compile on a string should return a function', function (done) {

    NunjucksHapi.compile('some string', {}, function (err, res) {

      Code.expect(err).to.be.null();
      Code.expect(res).function();

      res(function (err, output) {

        Code.expect(err).to.be.null();
        Code.expect(output).equal('some string');
        done();
      });
    });
  });

});
