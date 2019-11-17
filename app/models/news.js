var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var { CommentSchema, Comments } = require('./comment');


var NewsSchema = new Schema({
    content: String,
    title: {type:String ,required:true, index:{unique:true}},
    active: Boolean,
    image: String,
    datesubmit: Date,
    comments: [CommentSchema]
});
const News = mongoose.model('News', NewsSchema,'news')
module.exports = News;