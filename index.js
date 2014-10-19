var Nunjucks = require('Nunjucks')

Nunjucks.configure()

var wrapper = {
  compile: function(template,options) {
    var t = Nunjucks.compile(template)
    return function(context,options) {
      return t.render(context)
    }
  }
}

module.exports = wrapper
