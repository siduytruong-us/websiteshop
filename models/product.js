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
		db.close();
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
		db.close();
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
		db.close();
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

function searchProductByID(nameProduct, callback) { // customer
  MongoClient.connect(uri, function(err, db) {
    var ids = "/" + nameProduct + "/";
    if (err) throw err;
    var dbo = db.db("3dwebsite");
    dbo.collection("product").find({
      ID: eval(ids)
    }).toArray(function(err, result) {
      if (err) {
        console.log(err);
        throw err;
      } else if (result.length > 0) {
        callback(result);
      } else if (result.length == 0) {
        callback("error IDproduct");
      }
    });
  });
}


function searchProductByType(nameProduct, callback) { // customer
  MongoClient.connect(uri, function(err, db) {
    var ids = "/" + nameProduct + "/";
    if (err) throw err;
    var dbo = db.db("3dwebsite");
    dbo.collection("product").find({
      type: eval(ids)
    }).toArray(function(err, result) {
      if (err) {
        console.log(err);
        throw err;
      } else if (result.length > 0) {
        callback(result);
      } else if (result.length == 0) {
        callback("error IDproduct");
      }
    });
  });
}

function searchProductByPrice(nameProduct, callback) { // customer
  MongoClient.connect(uri, function(err, db) {
    var ids = "/" + nameProduct + "/";
    if (err) throw err;
    var dbo = db.db("3dwebsite");
    dbo.collection("product").find({
      price: eval(ids)
    }).toArray(function(err, result) {
      if (err) {
        console.log(err);
        throw err;
      } else
      {
        callback(result);
      }
    });
  });
}


function datanameid(nameProduct, callback)
{
	var kt = true;
	var searchProduct = [];
	searchProductByName(nameProduct.toString(), function(result) {
				if (result[0] == "e" || nameProduct == " ") {

				} else {
					searchProduct = result;
					console.log("in ra mang search");
				}
		});
	searchProductByID(nameProduct.toString(), function(result) {
				//searchProduct = result;
				if (result[0] == "e" || nameProduct == " ") {
					//searchProduct = [];
				} else {
					for(var i = 0; i<result.length; i++)
					{
						for(var j = 0; j<searchProduct.length;j++)
						{
							if(result[i].ID == searchProduct[j].ID)
							{
								kt = false;
							}
						}
						if(kt == false)
						{
							kt = true;
						}
						else
						{
							searchProduct.push(result[i]);
						}
					}
					console.log("in ra mang search");
				}
				callback(searchProduct);
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
		db.close();
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
		db.close();
  });
}

module.exports = mongoose.model('Product',someschema);
module.exports.productCollection = productCollection;
module.exports.findItem = findItemByID;
module.exports.searchProductByName =searchProductByName;

module.exports.searchProductByID =searchProductByID;
//module.exports.searchAll = searchAll;

module.exports.datanameid = datanameid;

module.exports.searchProductByType =searchProductByType;
module.exports.searchProductByPrice =searchProductByPrice;
module.exports.updateProductByID =updateProductByID;
module.exports.removeProductByID =removeProductByID;
module.exports.findProductByType =findProductByType;
