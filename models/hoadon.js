var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MongoClient = require('mongodb').MongoClient; // connect online
var uri = "mongodb+srv://duy:vippergod12@data-imllf.mongodb.net/test"; // connect online


var someschema = new Schema({
	ID : String,
	time : String,
	total : Number,
	customer: [],
	dagiao: Number,
	danhsachsanpham:[]
});


function hoadonCollection(callback) {
 MongoClient.connect(uri, function(err, db) {
	 if (err) throw err;
	 var dbo = db.db("3dwebsite");
	 dbo.collection("hoadon").find().toArray(function(err, result) {
		 if (err) {
			 throw err;
			 console.log(err);
		 } else if (result.length > 0) {
			 callback(result);
		 }
	 });
 });
}

module.exports = mongoose.model('Hoadon',someschema);
module.exports.hoadonCollection = hoadonCollection;
