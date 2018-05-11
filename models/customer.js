var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MongoClient = require('mongodb').MongoClient; // connect online
var uri = "mongodb+srv://duy:vippergod12@data-imllf.mongodb.net/test"; // connect online


var someschema = new Schema({
  ID: String,
  password: String,
  hoten: String,
  diachi: String,
  email: String,
  dienthoai: String,
});

 function customerCollection(callback) {
	MongoClient.connect(uri, function(err, db) {
		if (err) throw err;
		var dbo = db.db("3dwebsite");
		dbo.collection("customer").find().toArray(function(err, result) {
			if (err) {
				throw err;
				console.log(err);
			} else if (result.length > 0) {
				callback(result);
			}
		});
	});
}



module.exports = mongoose.model('Customer', someschema);
module.exports.customerCollection = customerCollection;
