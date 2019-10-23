var express = require('express');
var app = express();
var User = require('../models/user');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var superSecret = 'learnnodejs';

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type, Authoriation');
    next();
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Prac6',{ useNewUrlParser: true});
mongoose.set('userCreateIndex',true);


app.route('/users')

    .post(function(req,res){
        var user = new User();
        user.name = req.body.name;
        user.username = req.body.username;
        user.password = req.body.password;

        user.save(function(err){
            if(err){
                if(err.code == 11000)
                    return res.json({success:false, message: 'A user with that username already exists.'});
                else
                    return res.send(err);
            }
            else{
            res.json({message: 'User created!'});
            }
        });
    })

    .get(function(req,res){
        User.find(function(err,users){
            if(err) res.send(err);
            res.json(users);
        });
    });

    app.post('/authenticate',function(req,res){
        User.findOne({
            username: req.body.username
        }).select('name username password').exec(function(err,user){
            if(err) throw err;
    
            if(!user){
                res.json({
                    success: false,
                    message: 'Authenticate failed. User not found.'
                });
            }else if(user){
    
                var validPassword = user.comparePassword(req.body.password);
                if(!validPassword){
                    res.json({
                        success:false,
                        message: 'Authenticate failed. Wrong password.'
                    });
                }else {
    
                    var token = jwt.sign({
                        name: user.name,
                        username: user.username
                    },superSecret,{
                        expiresIn:'24h'
                    });
                    
                    res.json({
                        success:true,
                        message:'User da cap nhap token!',
                        token: token
                    });
                }
            }
        });
    });

    app.route('/users/:user_id')
    .get(function(req,res){
        User.findById(req.params.user_id, function(err,user){
            if(err) res.send(err);
            res.json(user);
        });
    })

    .put(function(req,res){
        User.findById(req.params.user_id,function(err,user){
            if(err) res.send(err);

            if(req.body.name) user.name = req.body.name;
            if(req.body.username) user.username = req.body.username;
            if(req.body.password) user.password = req.body.password;

            user.save(function(err){
                if(err) res.send(err);
                 res.json({message:'User updated!'});
            });
        });
    })

    .delete(function(req,res){
        User.remove({
            _id: req.params.user_id
        },function(err,users){
            if(err) res.send(err);
            res.json({message:'Successfully deleted'});
        });
    });
    
module.exports = app;