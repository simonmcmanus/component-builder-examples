
var nav = require('nav');
var search = require('search');

exports.init = function($el) {
  nav.init($el);
  search.init($el);
};
