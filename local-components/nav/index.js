

exports.init = function($el) {
  alert('in nav');

  var node = $el.find('a');
  node.click(function() {
    alert('clicked');
  });



};
