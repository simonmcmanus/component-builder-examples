'use strict';

var fs = require('fs');
var resolve = require('component-resolver');
var build = require('component-builder');
var scss = require('component-builder-sass');

var jade = require('jade');
var async = require('async');


var outFolder = __dirname + '/build/';


var stripFolder = function(name) {
    var brokenPath = name.split('/');
    return brokenPath[brokenPath.length -1];
};

/*
  component-builder plugin that lets you require compile jade tempaltes for use
  in the browser.
 */
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
      stripFolder(file.name),
      '", ',
      fn,
      ');'
    ];
    callback(out.join(''));
};



var autoRun = function(options) {
  return function(file) {
    console.log(file.name);
    file.name = stripFolder(file.name);


  }
}

/**
 * Given a components json, create the css and js files.
 * @param  {Object} component The component.json file.
 * @param  {Function} complete  when complete

 */
module.exports = function(component, complete) {

  resolve( component, {}, function (err, tree) {

    if (err) {
     throw err;
    }

    async.parallel([

      function(next) {
      },
      function(next) {
        // only include `.js` files from components' `.scripts` field
        build.scripts(tree)
          .use('scripts', autoRun())
          .use('scripts', build.plugins.js())

          .use('templates', build.plugins.string())
          .use('templates', compileJade)
          .build(function (err, string) {
             if (err) {
              throw err;
             }

             var out = '';

             // we only want to load the require script once.
             if(component.name === 'shared') {
              out += build.scripts.require;
             }
             out += string;

             // invoke page? will need to be dynamic, must be a better way.
             //out += 'require("' + component.name + '");';

             var filename = outFolder + component.name +'.js';
             fs.writeFileSync(filename, out);
             console.log('written', component.name);

             // self initialize if for the page.
             next();
           });


      },
      function(next) {
        //only include `.css` files from components' `.styles` field
        build.styles(tree)
          .use('styles', scss())
          .end(function (err, string) {

            if (err) {
              throw err;
            }

            var filename = outFolder + component.name +'.css';
            fs.writeFileSync(filename, string);
            console.log('written', filename);
            next();
          });
      }
    ], complete);
  });
};
