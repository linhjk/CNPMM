var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var db = require('./app/configs/db');

var Auth = require('./app/routes/auth.route');
var Login = require('./app/routes/login.route');
var News = require('./app/routes/news.route');
var Category = require('./app/routes/category.route');


var port = process.env.PORT || 5000;
var jwt = require('jsonwebtoken');

var superSecret = 'learnnodejs';

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type, Authoriation');
    next();
});

app.use(morgan('dev'));
app.use('/auth',Auth);
app.use('/',Login);
app.use('/',News);
app.use('/',Category);

app.use(function(req,res,next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token){
        jwt.verify(token,superSecret,function(err,decoded){
            if(err){
                return res.json({ success: false, message: 'Failed to authenticate token.'});
            }else {
                req.decoded = decoded;
                next();
            }
        });
    }else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.!!!!!'
        });
    }
});

app.get('/', function(req,res){
    res.json({message: 'Welcome to my Website'});
});


app.listen(port);
console.log('Dand dung Port: '+ port);

