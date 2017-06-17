// [LOAD PACKAGES]
var http = require('http');
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 8080;

// [CONFIGURE ROUTER]
var router = require('./routes')(app);

// [RUN SERVER]
var server = app.listen(port, function(){
 console.log("Express server has started on port " + port);
});
