var fs       = require('fs');
var path     = require('path');
var util     = require('util');
var jade     = require('builder-jade');
var bundler  = require('component-bundler');
var builder  = require('component-builder');
var resolver = require('component-resolver');

var runtime = builder.scripts.require + jade.runtime;

module.exports = function(app) {

  var regex = /build\/(.*)\.(css|js)$/;

  app.use(function* build(next) {
    var options = this.app.builder;

    if (regex && regex.test(this.path)) {
      var tree = yield* resolve(options.path);

      for (var name in tree) {
        var bundle = tree[name];

        var style = yield buildStyles(bundle);
        var script = yield buildScripts(bundle);

        if (!Object.keys(tree).indexOf(name)) {
          script = runtime + script;
        }

        yield writeFile(path.join(options.scripts, name + '.js'), script);
        yield writeFile(path.join(options.styles, name + '.css'), style);
      }

      // WTF??? Not touching regex in my setup. WEIRD BUG :(
      if (app.env === 'production') regex = null;
    }

    yield next;
  });

};

function* resolve(path) {
  var tree = yield resolver(path, {
    install: true
  });
  var meta = {
    locals: Object.keys(tree.locals)
  };

  return bundler.pages(meta)(tree);
}

function buildScripts(nodes) {
  return new builder.scripts(nodes)
    .use('scripts', builder.plugins.js())
    .use('templates', jade({ runtime: true }))
    .use('templates', builder.plugins.string())
    .end();
}

function buildStyles(nodes) {
  return new builder.styles(nodes)
    .use('styles', builder.plugins.css())
    .end();
}

function writeFile(path, chunk) {
  return function(callback) {
    fs.writeFile(path, chunk, callback);
  }
}
