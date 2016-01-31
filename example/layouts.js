var Hapi = require('hapi');
var Path = require('path');
var NunjucksHapi = require('../index.js');
var Vision = require('vision')

// Hapi needs a server
var server = new Hapi.Server();
server.connection({
    port: 5000,
    host: 'localhost'
});


// Tell hapi to use NunjucksHapi as the view engine for html
server.register(Vision, function(err) {

  server.views({
      engines: {
        'html': {
            module: NunjucksHapi
        }
      },
      compileMode: 'async',
      path: Path.join(__dirname, 'views')
  });


  // Add the example route
  server.route({
      method: 'GET',
      path: '/test',
      handler: function (request, reply) {

          // Pass a variable called myvariable to mytemplate

          reply.view('my-template-3', {
            'myvariable': 'myvalue'
          });
      }
  });


  // Start hapi
  server.start(function () {

      console.log('Listening on port 5000');
  });

})
