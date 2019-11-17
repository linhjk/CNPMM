var db = require('../configs/db');
var {Users} = require('../models/user');

module.exports.login = function(req,res){
    res.json({message:'Welcome to login'});
};

module.exports.postlogin = function(req,res){
    Users.findOne({
        username: req.body.username
    }).select('name username password').exec(function(err,user){
        if(err) throw err;
        if(!user){
            res.json({
                success: false,
                message: ' User not found.'
            });
        }else if(user){

            var validPassword = user.comparePassword(req.body.password);
            if(!validPassword){
                res.json({
                    success:false,
                    message: 'Wrong password.'
                });
            }else {
                res.json({
                    success: true,
                    message:'Đăng nhập thành công'
                })
            }
        }
    });
}