var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var NewsSchema = new Schema({
    name: {type:String, required:true, default:null},
});

module.exports = mongoose.model('categories', UserSchema);