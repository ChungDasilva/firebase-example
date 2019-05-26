var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const session = require('express-session')
const uuid = require('uuid/v4')
var app = express();
var {signIn, signUp} = require('./app');


app.set('view engine', 'ejs');
app.set('views', 'pages');
// add & configure middleware
// app.use(session({
//     genid: (req) => {
//       console.log('Inside the session middleware')
//       console.log(req.sessionID)
//       return uuid() // use UUIDs for session IDs
//     },
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true
//   }))
app.use(bodyParser());
app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
    console.log('Inside the homepage callback function')
    console.log(req.sessionID)
    res.render('index');
});

app.get('/sign-in', function(req, res) {
    res.render('sign-in');
});

app.get('/sign-up', function(req, res) {

});

app.post('/sign-in', async function (request, response) {
    var email = request.body.email;
    var password = request.body.password;
    await signIn(email, password);
    var drinks = [
        { name: 'Bloody Mary', drunkness: 3 },
        { name: 'Martini', drunkness: 5 },
        { name: 'Scotch', drunkness: 10 }
    ];
    var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";
    response.send('index', {
        drinks,
        tagline
    });
})

app.listen(1000, function () {
	console.log('listening 1000');
})
