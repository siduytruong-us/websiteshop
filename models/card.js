var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var someschema = new Schema({
	ID : String,
	name : String,
});

module.exports = mongoose.model('Card',someschema);
