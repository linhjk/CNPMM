var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    comment: {type:String, required:true, default:null},
    active: Boolean,
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    }
});

const comments = mongoose.model('Comments', CommentSchema,'comments');

module.exports.Comments = comments;
module.exports.CommentSchema = CommentSchema;