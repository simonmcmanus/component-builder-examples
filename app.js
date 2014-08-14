'use strict';

/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});


app.use(express.static(__dirname + '/build'));

app.configure('development', function(){
  app.use(express.errorHandler());
});


app.get('/', function(req, res){
  res.render('../pages/home/template', { title: 'Express' });
});

app.get('/search/:term', function(req, res){
  res.render('../pages/search/template', { title: 'Express' });
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
