var Nunjucks = require('nunjucks')
var _ = require('lodash')

var nunjucksEnv = undefined

var wrapper = {}

// this compile has the signature that hapi is expecting
wrapper.compile = function(template,options) {
  // we get the full template string from Hapi and pass it to Nunjucks
  // Nunjucks will pull in any includes and blocks itself
  var t = Nunjucks.compile(template,nunjucksEnv)
  return function(context,options) {
    return t.render(context)
  }
}

// sets the env Nunjucks is using; it needs to know where the views are
// you can also add custom filters etc. to this env
wrapper.viewEngine = function(env) {
  nunjucksEnv = env
  return wrapper
}

// in all other ways be exactly the same as Nunjucks
wrapper = _.defaults(wrapper,Nunjucks)

module.exports = wrapper