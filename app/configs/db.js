var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Prac6',{ useNewUrlParser: true});
mongoose.set('userCreateIndex',true);

module.exports = mongoose;