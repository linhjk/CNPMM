var express = require('express');
var { Users } = require('../models/user');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var superSecret = 'learnnodejs';


var app = express.Router();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authoriation');
    next();
});

app.route('/users')

    .post(function (req, res) {
        var user = new Users();
        user.name = req.body.name;
        user.username = req.body.username;
        user.password = req.body.password;
        user.admin = req.body.admin;
        user.active = req.body.active;
        user.comment_id = req.body.comment_id;

        user.save(function (err) {
            if (err) {
                if (err.code == 11000)
                    return res.json({ success: false, message: 'A user with that username already exists.' });
                else
                    return res.send(err);
            }
            else {
                res.json({ message: 'User created!' });
            }
        });
    })

    .get(function (req, res) {
        Users.find(function (err, users) {
            if (err) res.send(err);
            res.json(users);
        });
    });

app.post('/authenticate', function (req, res) {
    Users.findOne({
        username: req.body.username
    }).select('name username password').exec(function (err, user) {
        if (err) throw err;

        if (!user) {
            res.json({
                success: false,
                message: 'Đăng nhập thất bại. Không tìm thấy tài khoản này!'
            });
        } else if (user) {

            //res.json({success:true});

            var validPassword = user.comparePassword(req.body.password);
            if (!validPassword) {
                res.json({
                    success: false,
                    message: 'Đăng nhập thất bại. Sai mật khẩu !'
                });
            } else {

                var token = jwt.sign({
                    name: user.name,
                    username: user.username
                }, superSecret, {
                    expiresIn: '24h'
                });

                res.json({
                    success: true,
                    message: 'Đăng nhập thành công!',
                    token: token
                });
            }
        }
    });
});

app.route('/users/:user_id')
    .get(function (req, res) {
        Users.findById(req.params.user_id, function (err, user) {
            if (err) res.send(err);
            res.json(user);
        });
    })

    .put(function (req, res) {
        Users.findById(req.params.user_id, function (err, user) {
            if (err) res.send(err);

            if (req.body.name) user.name = req.body.name;
            if (req.body.username) user.username = req.body.username;
            if (req.body.password) user.password = req.body.password;

            user.save(function (err) {
                if (err) res.send(err);
                res.json({ message: 'User updated!' });
            });
        });
    })

    .delete(function (req, res) {
        Users.remove({
            _id: req.params.user_id
        }, function (err, users) {
            if (err) res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });
module.exports = app;