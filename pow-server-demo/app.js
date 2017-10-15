var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');


var app = express();


const pow = require('proof-of-work');
const Buffer = require('buffer').Buffer;
const COMPLEXITY = 21;
const VALIDITY = 60000; // token is valid only for 1 min - in millisec



const verifier = new pow.Verifier({
    // bit-size of Bloom filter
    size: 1024,

    // number of hash functions in a Bloom filter
    n: 1000,

    // target complexity
    complexity: COMPLEXITY,

    // **recommended, but optional** nonce prefix
    // It is highly suggested to use unique nonce prefix for your application
    // to avoid nonce-reuse attack
    // prefix: Buffer.from('abcd', 'hex'),

    // nonce validity time (default: one minute)
    validity: VALIDITY
});

// Remove stale nonces from Bloom filter
setInterval(() => {

    verifier.reset();
}, 60000);


function verifyAccess() {

    return function (req, res, next) {

        var token = req.headers['x-pow-token'];

        if (token && validatePowToken(token)) {
            console.log('Client solution successfully validated');
            next();
        } else {
            console.log('Client POW Token is invalid or missing');
            res.header('Content-Type', 'application/json')
            res.send({status: 'error', code: 'ACCESS DENIED', desc: 'Invalid Access Token'}, 403);
        }
    };

};

function validatePowToken (token) {
    console.log('Client Token: ', token);

    const nonce = Buffer.hasOwnProperty('from') ?
        Buffer.from(token, 'hex') : new Buffer(token, 'hex');

    return verifier.check(nonce, COMPLEXITY);
}



app.get('/api/protected', verifyAccess(), function (req, res) {
    res.header('Content-Type', 'application/json')
    res.send({status: 'success', desc: 'Hello World.'}, 200);
});


app.get('/protected', verifyAccess(), function (req, res) {
    console.log('Sending response');
    res.send('Hello, World :) !');
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', verifyAccess(), index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
