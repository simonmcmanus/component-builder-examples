/**
 * Require the module at `name`.
 *
 * @param {String} name
 * @return {Object} exports
 * @api public
 */

function require(name) {
  var module = require.modules[name];
  if (!module) throw new Error('failed to require "' + name + '"');

  if (!('exports' in module) && typeof module.definition === 'function') {
    module.client = module.component = true;
    module.definition.call(this, module.exports = {}, module);
    delete module.definition;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Register module at `name` with callback `definition`.
 *
 * @param {String} name
 * @param {Function} definition
 * @api private
 */

require.register = function (name, definition) {
  require.modules[name] = {
    definition: definition
  };
};

/**
 * Define a module's exports immediately with `exports`.
 *
 * @param {String} name
 * @param {Generic} exports
 * @api private
 */

require.define = function (name, exports) {
  require.modules[name] = {
    exports: exports
  };
};
require.register("./c/buses", function (exports, module) {
'use strict';


});




require.define("./c/buses/bus.jade", function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<li><a href=\"#\">275</a></li>");;return buf.join("");
});


require.define("./c/buses/buses.jade", function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div id=\"buses\"><h1>hi i am in your search</h1><div><ul><li><a href=\"#\">21</a></li><li><a href=\"#\">20</a></li><li><a href=\"#\">275</a></li></ul></div></div>");;return buf.join("");
});require.register("./c/search", function (exports, module) {

});




require.define("./c/search/search.jade", function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (value) {
buf.push("<input" + (jade.attr("value", value, true, false)) + "/><input type=\"submit\"/>");}("value" in locals_for_with?locals_for_with.value:typeof value!=="undefined"?value:undefined));;return buf.join("");
});require.register("./c/trains", function (exports, module) {

});




require.define("./c/trains/train.jade", function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<h1><hi>my name id + sd</hi></h1>");;return buf.join("");
});require.register("homepage/./start.js", function (exports, module) {
'use strict'


var t = require('./local-components/buses')('bacon');
console.log(t);

});

require("homepage");