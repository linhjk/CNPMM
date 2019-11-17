var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    category_name: {type:String, required:true, default:null},
    active: Boolean ,
    news_id: Array
});

module.exports = mongoose.model('Categories', CategorySchema,'categories');