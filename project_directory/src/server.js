//main server
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
// Set views path, template engine and default layout
app.use(express.static(__dirname + '../assets'));
app.use(express.static(__dirname + '../public'));
app.use(express.static(__dirname + '/'));
app.engine('.html', require('ejs').__express);
app.set('views', __dirname);
app.set('view engine', 'html');

// The request body is received on GET or POST.
// A middleware that just simplifies things a bit.
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));



//functions


//routes

//main page
app.get('/', function(req, res) {
    res.render('index', {
        errors: ''
    });
});


app.get();

app.post();

app.delete();



app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');