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

function customerUpdate(id, hoten, password, diachi, email, dienthoai) { // customer
  MongoClient.connect(uri, function(err, db) {
    //var ids = "/"+nameProduct+"/";
    if (err) throw err;
    var dbo = db.db("3dwebsite");
    dbo.collection("customer").update({
      ID: id
    }, {
      $set: {
        hoten: hoten,
        password: password,
        diachi: diachi,
        email: email,
        dienthoai: dienthoai
      }
    }, {
      multi: true
    });
  });
}

function customerRemove(id) { // customer
  MongoClient.connect(uri, function(err, db) {
    //var ids = "/"+nameProduct+"/";
    if (err) throw err;
    var dbo = db.db("3dwebsite");
    dbo.collection("customer").remove({
      ID: id
    });
  });
}


function findCustomer(idkh, callback) { // customer
  MongoClient.connect(uri, function(err, db) {

    if (err) throw err;
    var dbo = db.db("3dwebsite");
    dbo.collection("customer").findOne({
      ID: idkh
    }, function(err, result) {
      if (err) {
        console.log(err);
        throw err;
        callback("errorIDcustomer");
      } else {
        callback(result);
      }
    });
  });
}


module.exports = mongoose.model('Customer', someschema);
module.exports.customerCollection = customerCollection;
module.exports.customerUpdate = customerUpdate;
module.exports.customerRemove = customerRemove;
module.exports.findCustomer = findCustomer;
