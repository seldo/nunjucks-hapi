var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var Hapi = require('hapi');
var restify = require('restify');
var Path = require('path');
var NunjucksHapi = require('../../index');


lab.experiment('basic functions', function () {

  // Initialize Nunjucks and Hapi

  var server = new Hapi.Server();
  server.connection({
    port: 5000,
    host: 'localhost'
  });

  var viewPath = Path.join(__dirname, '../views/');

  server.views({
    engines: {
      html: NunjucksHapi
    },
    path: viewPath
  });

  // An easy string fetching client to test with

  var client = restify.createStringClient({
    url: 'http://localhost:5000'
  });

  lab.before(function (done) {

    // Start hapi

    server.start(function () {

      done();
    });
  });

  lab.test('Compile on a string should return a function', function (done) {

    server.route({
      method: 'GET',
      path: '/test-1',
      handler: function (request, reply) {
        reply.view('3-in-hapi-1');
      }
    });

    client.get('/test-1', function (err, req, res, data) {

      Code.expect(data).equal('I\'m a template.');

      done();
    });
  });

  lab.test('Variables should be completed', function (done) {

    server.route({
      method: 'GET',
      path: '/test-2',
      handler: function (request, reply) {
        reply.view('3-in-hapi-2',{
          variableName: 'value'
        });
      }
    });

    client.get('/test-2', function (err, req, res, data) {
      Code.expect(data).equal('I\'m a value.');
      done();
    });
  });

  lab.test('Inheritance of a base should work', function (done) {

    // FIXME: this only takes effect if I do it inside the test rather than in the setup. Why?
    NunjucksHapi.configure(viewPath);

    server.route({
      method: 'GET',
      path: '/test-3',
      handler: function (request, reply) {

        reply.view('3-in-hapi-3',{
          variableName: 'value'
        });
      }
    });

    client.get('/test-3', function(err, req, res, data) {

      Code.expect(data).equal('<html><body>\n\nI\'m a value.\n\n</body></html>');

      done();
    });
  });

  lab.test('Includes should work', function (done) {

    NunjucksHapi.configure(viewPath);

    server.route({
      method: 'GET',
      path: '/test-4',
      handler: function (request, reply) {

        reply.view('3-in-hapi-4',{
          variableName: 'value'
        });
      }
    });

    client.get('/test-4', function (err, req, res, data) {

      Code.expect(data).equal('<html><body>\n\nI\'m a value.\nI\'m in an include file.\n\n</body></html>');

      done();
    });
  });

});
