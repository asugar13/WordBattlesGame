//main server
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
// var expressValidator = require('express-validator');
var path = require('path');


var user_routes = require('../routes/user_routes');


var app = express();
app.use(express.static(__dirname + '/../assets'));
app.use(express.static(__dirname + '/../public'));

app.use(express.static(__dirname + '/'));

// Set views path, template engine and default layout
app.engine('.html', require('ejs').__express);
app.set('views', __dirname);
app.set('views', __dirname +'/../public');
app.set('view engine', 'html');

// The request body is received on GET or POST.
// A middleware that just simplifies things a bit.
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
// app.use(expressValidator);  //required for Express-Validator



//functions
app.get('/login', user_routes.LogIn);

app.get('/main', function(req, res) {
  res.render(__dirname+'/../public/main_page.html');


})
//routes

//main page
app.get('/', function(req, res) {
    res.render('index.html', {
        errors: ''
    });
});





app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');
