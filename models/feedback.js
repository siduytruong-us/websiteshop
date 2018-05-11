var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var someschema = new Schema({
	ID : String,
	name : String,
	dienthoai : String,
	email  : String,
	noidung : String,
	date  : String,
	status: Number,
});

module.exports = mongoose.model('Feedback',someschema);
