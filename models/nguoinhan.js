var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var someschema = new Schema({
	IDhd : String,
	diachi : String,
	dienthoai : String,
	name : String
});

module.exports = mongoose.model('Nguoinhan',someschema);
