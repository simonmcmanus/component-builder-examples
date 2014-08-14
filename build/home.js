require.register("buses", function (exports, module) {
'use strict';

alert('i am your homepage')

});




require.define("bus.jade", function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<li><a href=\"#\">275</a></li>");;return buf.join("");
});


require.define("buses.jade", function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div id=\"buses\"><h1>hi i am in your search</h1><div><ul><li><a href=\"#\">21</a></li><li><a href=\"#\">20</a></li><li><a href=\"#\">275</a></li></ul></div></div>");;return buf.join("");
});require.register("search", function (exports, module) {

});




require.define("search.jade", function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (value) {
buf.push("<input" + (jade.attr("value", value, true, false)) + "/><input type=\"submit\"/>");}("value" in locals_for_with?locals_for_with.value:typeof value!=="undefined"?value:undefined));;return buf.join("");
});require.register("trains", function (exports, module) {

});




require.define("train.jade", function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<h1><hi>my name id simon</hi></h1>");;return buf.join("");
});require.register("home", function (exports, module) {
alert('on homepage');

});

