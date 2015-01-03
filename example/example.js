var Hapi = require('hapi')
var Path = require('path')
var NunjucksHapi = require('../index.js')

// hapi needs a server
var server = new Hapi.Server()
server.connection({port:5000,host:"localhost"})

// both hapi and nunjucks need to know where to look for templates
var viewPath = Path.join(__dirname, 'views')

// configure Nunjucks; at minimum it needs the path to the views
var env = NunjucksHapi.configure(viewPath)

// you can do extra stuff with Nunjucks' env if you want
env.addFilter('shorten', function(str, count) {
  return str.slice(0, count || 5)
})

// tell hapi to use NunjucksHapi as the view engine for html
server.views({
  engines: {
    // env is required or paths will be wrong
    html: NunjucksHapi.viewEngine(env)
  },
  path: viewPath
})

// Add the example route
server.route({
  method: 'GET',
  path: '/test',
  handler: function (request, reply) {
    // pass a variable called myvariable to mytemplate
    reply.view('mytemplate',{
      'myvariable': 'myvalue'
    })
  }
})

// start hapi
server.start(function() {
  console.log("Listening on port 5000")
})