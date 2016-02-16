var Nunjucks = require('nunjucks');
var _defaults = require('lodash.defaults');

var wrapper = {};

var env = undefined;

wrapper.compile = function (src, options, callback) {

  // Get if compile mode is async by checking if the callback is defined
  var asyncCompileMode = (typeof callback === 'function');

  // Nunjucks will know where the templates are from the environment
  var template = Nunjucks.compile(src, env || options.environment, (Object.hasOwnProperty(options,'filename') ? options.filename : null) );

  if (asyncCompileMode) {

    // Render the template in the asynchronous way
    var renderer = function (context, options, next) {
      template.render(context, next);
    };

    return callback(null, renderer);

  } else {

    // Render the template in the synchronous way
    return function (context, options) {
      return template.render(context);
    };
  }

}

wrapper.prepare = function (options, next) {
  // if we've overridden our environment we use it, otherwise we go with a default
  options.compileOptions.environment = env || Nunjucks.configure(options.path, { watch : false });
  return next();
}

// the configure() method lets us override the environment to add filters etc
wrapper.configure = function (path, options) {
  return env = Nunjucks.configure(path, options || { watch : false });
};

// In all other ways be exactly the same as Nunjucks
wrapper = _defaults(wrapper, Nunjucks);

exports = module.exports = wrapper;
