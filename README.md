# nunjucks-hapi
An extremely simple wrapper to let you use Nunjucks as a Hapi templating engine.

I looked at what Handlebars does and created a wrapper that produces an identical
API for nunjucks. I make absolutely no representations as to its performance or
correctness.

I wrote this in 10 minutes and have done no testing. You're welcome!

## Usage

The following example will let you use Nunjucks templates, including template
inheritance, inside Hapi. This assumes:

* your templates are in a directory called "views"
* they have the extension "html"
* you have a template file in there called "mytemplate"

```
var Hapi = require('hapi')
var Path = require('path')
var Nunjucks = require('nunjucks-hapi')

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
```
