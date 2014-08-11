require.register("./local-components/buses", function (exports, module) {
'use strict';


});

require.define("./local-components/buses/bus.jade", "\"li\\n  a(href=\\\"#\\\") 275\\n\\n\"");

require.define("./local-components/buses/buses.jade", "\"div#buses\\n  h1 hi i am in your search\\n  div\\n    ul\\n      li\\n        a(href=\\\"#\\\") 21\\n      li\\n        a(href=\\\"#\\\") 20\\n      li\\n        a(href=\\\"#\\\") 275\\n\\n\"");

require.register("./local-components/trains", function (exports, module) {

});

require.define("./local-components/trains/train.jade", "\"h1\\n    hi my name id + sd\\n\"");

require.register("homepage", function (exports, module) {
'use strict'


var t = require('simon')('bacon');
console.log(t);

});

