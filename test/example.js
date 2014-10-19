var Hapi = require('hapi')
var Path = require('path')
var Nunjucks = require('../index.js')

var server = new Hapi.Server('localhost', 5000)

// set up templates
server.views({
  engines: {
    html: Nunjucks
  },
  path: Path.join(__dirname, 'views')
})

// Add a route
server.route({
  method: 'GET',
  path: '/test',
  handler: function (request, reply) {
    reply.view('mytemplate',{
      'myvariable': 'myvalue'
    })
  }
})

// start server
server.start()