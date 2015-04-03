var Nunjucks = require('nunjucks');
var _defaults = require('lodash.defaults');

var wrapper = {};

var viewPath = undefined;
var env = undefined;

// This compile has the signature that hapi is expecting

wrapper.compile = function (template, options) {

  // We get the full template string from Hapi and pass it to Nunjucks
  // Nunjucks will pull in any includes and blocks itself

  var t = Nunjucks.compile(template, env);

  return function (context, options) {
    return t.render(context);
  };
};


// We need our compiler to know about the env so we keep a reference to it

wrapper.configure = function (path, options) {

  viewPath = path;
  env = Nunjucks.configure(path, options);

  return env;
};


// In all other ways be exactly the same as Nunjucks

wrapper = _defaults(wrapper, Nunjucks);

exports = module.exports = wrapper;
