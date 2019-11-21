var express = require('express');
var controller = require("../controllers/news.controller");
var router = express.Router();
var jwt = require('jsonwebtoken');

var superSecret = 'learnnodejs';


router.use(function(req,res,next){
    console.log('Bao hieu API router co nguoi vao dang MAIN');
    
    console.log('Dang lam tren New!');
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.Authorization;

    if(token) {
        jwt.verify(token, superSecret,function(err, decoded){
            if(err) {
                return res.json({success: false, message:'Failed to authenticate token.'});
                
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success:false,
            message:'No token provided.'
        })
    }
});
router.get('/news', controller.getNews);
router.post('/news',controller.addNews);
router.post('/findnew',controller.getNewsFromCategory);

module.exports = router;