var Category = require ('../models/category');
var News = require('../models/news');

module.exports.getCategory = function(req,res){
    Category.find(function(err,categorys){
        if(err)
        res.json(err);
        else
        res.json(categorys);
    })
}

module.exports.addCategory = function (req, res) {
    var category = new Category();
    category.category_name = req.body.category_name;
    category.active = req.body.active;
    category.save(function (err) {
        if (err) {
            if (err.code == 11000)
                return res.json({ success: false, message: 'A user with that username already exists.' });
            else
                return res.send(err);
        }
        else {
            res.json({ message: 'Created' });
        }
    });
}

module.exports.addNewsToCategory = function(req,res){
    // var category = new Category();
    Category.findOne(
        {category_name:req.body.category_name},
        function(err,category){
            if(err) res.json(err);
            else{
                category.news_id.push(req.body._id)
            };
            category.save(function(err){
                if(err) res.json(err);
                res.json({message:'da them vao category'});
            })
        })
}