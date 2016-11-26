//main server
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');

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


// Set up to use a session
app.use(cookieParser('session'));
app.use(session({
    secret: 'asdf'
}));


// The request body is received on GET or POST.
// A middleware that just simplifies things a bit.
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));


//functions
app.post('/login', user_routes.LogIn);
app.get('/logout', user_routes.Logout);
app.get('/user_info', user_routes.UserInfo);
app.post('/signup', user_routes.SignUp);
app.get('/database', user_routes.DisplayDB);


app.get('/main', function(req, res) {
  res.render(__dirname+'/../public/main_page.html');
});

app.get('/admin', function(req, res) {
  res.render(__dirname+'/../public/admin_page.html');
});

app.get('/profile', function(req, res) {
  res.render(__dirname+'/../public/profile_page.html');
});

app.get('/signup', function(req, res) {
  res.render(__dirname+'/../public/signup_page.html');
});



//main page
app.get('/', function(req, res) {
    res.render('index.html', {
        errors: ''
    });
});





app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');
