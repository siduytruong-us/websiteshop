var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MongoClient = require('mongodb').MongoClient; // connect online
var uri = "mongodb+srv://duy:vippergod12@data-imllf.mongodb.net/test"; // connect online
var crypto = require('crypto-js');
var pass;

var someschema = new Schema({
	ID : String,
	name : String,
	age : Number,
	password : String
});



function staffCollection(callback) { // staff
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("3dwebsite");
    dbo.collection("staff").find().toArray(function(err, result) {
      if (err) {
        console.log(err);
      } else if (result.length > 0) {
				for(var i = 0; i< result.length; i++)
				{
					var bytes = crypto.AES.decrypt(result[i].password,'dudada');
					pass = bytes.toString(crypto.enc.Utf8);
					result[i].password = pass;
				}
				pass = null;
        callback(result);
      }
    });
		db.close();
  });
}

module.exports = mongoose.model('Staff',someschema);
module.exports.staffCollection = staffCollection;
