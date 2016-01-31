# nunjucks-hapi
A simple wrapper to let you use Nunjucks as a Hapi templating engine.

[Nunjucks documentation](http://mozilla.github.io/nunjucks/api.html)

[Hapi documentation](http://hapijs.com/api)

## Usage

The following example will let you use Nunjucks templates, including template
inheritance, inside Hapi. This assumes:

* your templates are in a directory called "views"
* they have the extension "html"
* you have a template file in there called "mytemplate"

```javascript
var Hapi = require('hapi')
var Path = require('path')
var NunjucksHapi = require('nunjucks-hapi')
var Vision = require('vision')

var server = new Hapi.Server()
server.connection({port:5000,host:'localhost'})

// set up templates
server.register(Vision, function(err) {
  server.views({
    engines: {
      html: NunjucksHapi
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
})
```

### Using Nunjucks filters and environments

If you want to go beyond the default configuration of Nunjucks, you
need to configure an environment. Once that's done, you can do
anything to the environment, like add filters or custom tags via
extensions. This works just like the Nunjucks documentation says it
does, with the exception that the path to templates is now **required**.

The example is otherwise the same as the above

```javascript
var NunjucksHapi = require('nunjucks-hapi');

// set a common view path
var viewPath = Path.join(__dirname, 'views')

var env = NunjucksHapi.configure(viewPath)

// do anything you want to the env here
env.addFilter('somefilter', function(str, count) {
  // return some string
})

// set up templates with the same view path
server.register(Vision, function(err) {
  server.views({
    engines: {
      html: NunjucksHapi
    },
    path: viewPath
  })

  server.start()
})
```
