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
var port = process.env.PORT || 54000;

// DEFINE MODEL
var Book = require('./db.mongo.example/models/book');

// [CONFIGURE ROUTER]
var router = require('./db.mongo.example')(app, Book);

// [RUN SERVER]
var server = app.listen(port, function(){
 console.log("Express server has started on port " + port);
});

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/mongodb_tutorial');
// mongoose.connect('mongodb://username:password@host:port/database?options...');
