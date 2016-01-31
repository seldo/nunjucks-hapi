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


// Both hapi and nunjucks need to know where to look for templates
var viewPath = Path.join(__dirname, 'views');


// To add a filter, you need to create an env
// this means you have to explicitly set the views path
var env = NunjucksHapi.configure(viewPath);

// You can do extra stuff with Nunjucks' env if you want
env.addFilter('shorten', function (str, count) {
  console.log(str)
    return str.slice(0, count || 5);
});

// Tell hapi to use NunjucksHapi as the view engine for html
server.register(Vision, function(err) {

  server.views({
      engines: {
          html: NunjucksHapi
      },
      path: viewPath
  });


  // Add the example route
  server.route({
      method: 'GET',
      path: '/test',
      handler: function (request, reply) {

          // Pass a variable called myvariable to mytemplate

          reply.view('my-template-2',{
              'myvariable': 'myvalue'
          });
      }
  });

  // Start hapi
  server.start(function () {

      console.log('Listening on port 5000');
  });

})
