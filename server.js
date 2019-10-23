var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./app/models/user');
var Auth = require('./app/routes/auth');
var port = process.env.PORT || 3000;
var jwt = require('jsonwebtoken');

var superSecret = 'learnnodejs';
// var apiRouter = express.Router();


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

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Prac6',{ useNewUrlParser: true});
mongoose.set('userCreateIndex',true);


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

