const { Comments } = require('../models/comment');
var News = require('../models/news');
var Category = require('../models/category');

module.exports.getNews = function (req, res) {
    News.find(function (err, news) {
        if (err)
            res.json(err);
        else
            res.json(news);
    })
}

module.exports.addNews = function (req, res) {
    var news = new News();
    news.content = req.body.content;
    news.title = req.body.title;
    news.active = req.body.active;
    news.image = req.body.image;
    news.datesubmit = req.body.datesubmit;

    news.save(function (err) {
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

module.exports.getNewsFromCategory = function (req, res) {
    Category.findOne({ category_name: req.body.category_name },
        function (err, category) {
            if (err) res.json(err);
            else {
                // res.json(category.news_id);
            News.find({_id: category.news_id},
                    function (err, news) {
                        if (err) res.json(err);
                        else {
                            res.json(news);
                        };
                    })
            }
        })
}
module.exports.getNewsByID = function(req,res){
    News.findById(req.params.new_id, function (err, news) {
        if (err) res.send(err);
        res.json(news);
    });
}

// const getAllComments = (newId) => {
//     const newDetail = News
//     .findById(newId);

//     const comments = newDetail.comments.map(comment => {
//         const Comment = Comments
//         .findById(comment._id)
//         .populate('User');
//         return Comment;
//     });
// }
//     return comments;
// }