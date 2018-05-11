var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MongoClient = require('mongodb').MongoClient; // connect online
var uri = "mongodb+srv://duy:vippergod12@data-imllf.mongodb.net/test"; // connect online


var someschema = new Schema({
	name : String,
	ID : String,
	price : Number,
	type : String,
	info : String,
	link : String,
	url : String,
	status : Number,
});

function productCollection(callback) { // product
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("3dwebsite");
    dbo.collection("product").find().toArray(function(err, result) {
      if (err) {
        console.log(err);
      } else if (result.length > 0) {
        callback(result);
      }
    });
  });
}


function findItemByID(id, callback) { // customer
  MongoClient.connect(uri, function(err, db) {

    if (err) throw err;
    var dbo = db.db("3dwebsite");
    dbo.collection("product").findOne({
      ID: id
    }, function(err, result) {
      if (err) {
        console.log(err);
        throw err;
        callback("errorIDproduct");
      } else {
        callback(result);
      }

    });
  });
}


function findProductByType (type, callback) {
	MongoClient.connect(uri, function(err, db) {
		if (err) throw err;
		var dbo = db.db("3dwebsite");
		dbo.collection("product").find({
			type: type
		}).toArray(function(err, result) {
			if (err) throw err;
			else {
				callback(result);
			}
		});
	})
}


function searchProductByName(nameProduct, callback) { // customer
  MongoClient.connect(uri, function(err, db) {
    var ids = "/" + nameProduct + "/";
    if (err) throw err;
    var dbo = db.db("3dwebsite");
    dbo.collection("product").find({
      name: eval(ids)
    }).toArray(function(err, result) {
      if (err) {
        console.log(err);
        throw err;
      } else if (result.length > 0) {
        callback(result);
      } else if (result.length == 0) {
        callback("error Nameproduct");
      }
    });
  });
}



function updateProductByID(id, name, info, price, link) { // customer
  MongoClient.connect(uri, function(err, db) {
    //var ids = "/"+nameProduct+"/";
    if (err) throw err;
    var dbo = db.db("3dwebsite");
    dbo.collection("product").update({
      ID: id
    }, {
      $set: {
        name: name,
        info: info,
        price: price,
        link: link
      }
    }, {
      multi: true
    });
  });
}


function removeProductByID(id) { // customer
  MongoClient.connect(uri, function(err, db) {
    //var ids = "/"+nameProduct+"/";
    if (err) throw err;
    var dbo = db.db("3dwebsite");
    dbo.collection("product").remove({
      ID: id
    });
  });
}

module.exports = mongoose.model('Product',someschema);
module.exports.productCollection = productCollection;
module.exports.findItem = findItemByID;
module.exports.searchProductByName =searchProductByName;
module.exports.updateProductByID =updateProductByID;
module.exports.removeProductByID =removeProductByID;
module.exports.findProductByType =findProductByType;
