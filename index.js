var Nunjucks = require('nunjucks')
var _ = require('lodash')

var env = undefined

var wrapper = {}

// this compile has the signature that hapi is expecting
wrapper.compile = function(template,options) {
  // we get the full template string from Hapi and pass it to Nunjucks
  // Nunjucks will pull in any includes and blocks itself
  var t = Nunjucks.compile(template,env)
  return function(context,options) {
    return t.render(context)
  }
}

// we need our compiler to know about the env so we keep a reference to it
wrapper.configure = function(path,options) {
  env = Nunjucks.configure(path,options)
  return env
}

// in all other ways be exactly the same as Nunjucks
wrapper = _.defaults(wrapper,Nunjucks)

module.exports = wrapper