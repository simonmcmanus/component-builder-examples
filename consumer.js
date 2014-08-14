var builder = require('./builder');

var fs = require('fs-extra');


fs.remove('./build', function() {
  fs.mkdir('./build', function() {


    builder(require('./pages/shared/component.json'), function() {
      console.log('alll done');
    });
    builder(require('./pages/home/component.json'), function() {
      console.log('alll done');
    });

    // builder(require('./pages/search/component.json'), function() {
    //   console.log('alll done');
    // });

  });


});


