var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();


lab.experiment('basic functions', function () {

  var NunjucksHapi = require('../../index');

  lab.before(function (done) {

    done();
  });

  lab.test('configure should return an env', function (done) {

    var env = NunjucksHapi.configure('some/path', { watch:true });
    Code.expect(env.asyncFilters).array();
    done();
  });

});
