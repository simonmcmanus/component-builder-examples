'use strict';

var fs = require('fs');
var resolve = require('component-resolver');
var build = require('component-builder');
var scss = require('component-builder-sass');

var jade = require('builder-jade');


var outFolder = __dirname + '/build/';

resolve(process.cwd(), {
  // install the remote components locally
  install: true
}, function (err, tree) {
  if (err) {
   throw err;
  }

  // only include `.js` files from components' `.scripts` field
  build.scripts(tree)
    .use('scripts', build.plugins.js())
     .build(function (err, string) {
       if (err) {
        throw err;
       }

       var out = build.scripts.require + string;
       out += 'require("homepage");';
       fs.writeFileSync(outFolder + 'build.js', out);
     });

  // only include `.css` files from components' `.styles` field
  build.styles(tree)
    .use('styles', scss())
    .end(function (err, string) {

      //console.log(string, __dirname);
      if (err) {
        throw err;
      }

      fs.writeFileSync(outFolder + 'build.css', string);
    });
});
