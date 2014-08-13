var resolve = require('component-resolver');
var build = require('component-builder');


var fs = require('fs')


var jade = require('jade');

var outFolder = __dirname + '/build/';




var compileJade = function(file, callback) {

    if (file.extension !== 'jade') return callback();
    var template = fs.readFileSync(file.filename, 'utf8');
    var fn = jade.compileClient(template, {
      filename: file.filename
    });

    var out = [
      '\n\n\n',
      'require.define("',
      file.name,
      '", ',
      fn,
      ');'
    ];
    callback(out.join(''));
};


resolve({
  root: './component.json'
}, function (err, tree) {

console.log(tree)
  // only include `.js` files from components' `.scripts` field
  build.scripts(tree)
    .use('scripts', build.plugins.js())
    .use('templates', build.plugins.string())
    .use('templates', compileJade)
    .build(function (err, string) {
       if (err) {
        throw err;
       }

       var out = build.scripts.require;
       out += string;
       // will need to be dynamic, must be a better way.
       out += 'require("homepage");';
       fs.writeFileSync(outFolder + 'build.js', out);
     });

});
