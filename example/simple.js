var Hapi = require('hapi')
var Path = require('path')
var NunjucksHapi = require('../index.js')

// hapi needs a server
var server = new Hapi.Server()
server.connection({port:5000,host:"localhost"})

// tell hapi to use NunjucksHapi as the view engine for html
server.views({
  engines: {
    html: NunjucksHapi
  },
  path: Path.join(__dirname, 'views')
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