'use strict';

var fs = require('fs');
var resolve = require('component-resolver');
var build = require('component-builder');
var scss = require('component-builder-sass');

var jade = require('jade');

var jadeBuilder = require('builder-jade');
var outFolder = __dirname + '/build/';




var compile = function(options) {
  return function(file, callback) {
        // content is availble on file.string but has some dodge escaping so
    // we read the file again.
    var template = fs.readFileSync(file.filename, 'utf8');

    var fn = jade.compileClient(template, {
      filename: file.filename
    });

    console.log('t', typeof fn)

    var arr = fn.split('\n'); // eeek

    console.log(file)

    arr[0] = '    return (function(local) {';
    arr.unshift('require.register("' + file.name + '", function (exports, module) {');


arr[arr.length-1] = '})()});';

arr.push('\n');
arr.push('\n');
arr.push('\n');
arr.push('\n');
arr.push('\n');
arr.push('\n');

//    var out = ['require.register("', 'simon', '", '];
      //out.push(fn)
  //  out.push('});');
    callback(arr.join('\n'));

  };

}

var compileJade = function(file, callback) {


  console.log('')
    if (file.extension !== 'jade') return done();
    // content is avaliable on file.string but has some dodge escaping so
    // we read the file again.
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
