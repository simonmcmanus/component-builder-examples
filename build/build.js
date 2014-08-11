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
require.register("./local-components/buses", function (exports, module) {
'use strict';


});




require.define("./local-components/buses/bus.jade", function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<li><a href=\"#\">275</a></li>");;return buf.join("");
});


require.define("./local-components/buses/buses.jade", function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<div id=\"buses\"><h1>hi i am in your search</h1><div><ul><li><a href=\"#\">21</a></li><li><a href=\"#\">20</a></li><li><a href=\"#\">275</a></li></ul></div></div>");;return buf.join("");
});require.register("./local-components/trains", function (exports, module) {

});




require.define("./local-components/trains/train.jade", function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<h1><hi>my name id + sd</hi></h1>");;return buf.join("");
});require.register("homepage", function (exports, module) {
'use strict'


var t = require('./local-components/buses/bus.jade')('bacon');
console.log(t);

});

require("homepage");