'use strict';

var fs = require('fs');
var resolve = require('component-resolver');
var build = require('component-builder');
var scss = require('component-builder-sass');

var jade = require('jade');

var outFolder = __dirname + '/build/';




var compileJade = function(file, callback) {
    if (file.extension !== 'jade') return callback();
    var template = fs.readFileSync(file.filename, 'utf8');
    var fn = jade.compileClient(template, {
      filename: file.filename
    });

    // wrap the function in a define.
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


resolve( require('./component.json'), {}, function (err, tree) {

  if (err) {
   throw err;
  }



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




// build.scripts(tree)
//   .use('scripts', build.plugins.js())
//   .use('templates', build.plugins.string())
//   .use('templates', jadeBuilder({
//     string: true,
//   }))
//   .use('jade', jadeBuilder({
//     runtime: false,
//   }))
//   .build(function (err, string) {
//     if (err) throw err;

//     fs.writeFileSync('build.js', string);
//   })



  // only include `.css` files from components' `.styles` field
  // build.styles(tree)
  //   .use('styles', scss())
  //   .end(function (err, string) {

  //     //console.log(string, __dirname);
  //     if (err) {
  //       throw err;
  //     }

  //     fs.writeFileSync(outFolder + 'build.css', string);
  //   });
});
