var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

lab.experiment('basic functions', function () {

  var NunjucksHapi = require('../../index');

  lab.before(function(done) {

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
