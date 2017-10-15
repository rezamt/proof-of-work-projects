var express = require('express');
var cors = require('cors')
var hashcash = require('./');
var app = express();

app.configure(function() {
  app.use(express.cookieParser());
  app.use(express.session({ secret: "keyboard cat" }));
  app.use(app.router);
  app.use(express.static(__dirname));
});

var corsOptions = {
    origin: '*',
    header: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/protected', cors(corsOptions), hashcash.middleware(),function(req,res) {
	res.send('Hello, World!');
});

app.get('/unprotected',function(req,res) {
	res.send('You should use protection.');
});

var port = 8000;
console.log("Listening on: " + port);
console.log("Access server on: http://localhost:8000/");
app.listen(port);
