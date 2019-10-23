var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var NewsSchema = new Schema({
    title: {type:String ,required:true},
    content: {type:String, required:true, default:null},
    image: {type:String,required:false,default:null},
    
});

module.exports = mongoose.model('News', UserSchema);