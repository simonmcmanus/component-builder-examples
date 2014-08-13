var resolve = require('component-resolver');

var component = require('./component.json');


resolve(component, {}, function (err, tree) {
  console.log(err, tree);
})

// console.log('r', resolve);
// console.log('cb1', cb1);
//console.log('cb2', cb2);
