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
		db.close();
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
		db.close();
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
		db.close();
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
		db.close();
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
function searchType(nameProduct,ttype,callback)
{
	var searchProduct = [];
	var sproduct = [];
	//var kt = true;
		datanameid(nameProduct,function(result)
	{
		searchProduct = result;
		sproduct = searchProduct.filter(x => x.type == ttype);
		searchProduct = sproduct;
		callback(searchProduct);
	});
}

function searchAll(nameProduct,callback)
{
	var searchProduct = [];
	var kt = true;
	datanameid(nameProduct,function(result){
		searchProduct = result;
	});
	searchProductByType(nameProduct.toString(), function(result) {
				//searchProduct = result;
				if (result[0] == "e" || nameProduct == " ") {
					console.log("err");
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
function searchPrice(nameProduct,searchtype,callback)
{
	var searchProduct = [];
	var sproduct = [];
	searchAll(nameProduct,function(result){
		searchProduct = result;
		for(var k = 0; k< searchProduct.length;k++)
		{
			 if(searchProduct[k].price <= 100000 && searchProduct[k].price > 0 && searchtype == "price_1")
			 {
				 sproduct.push(searchProduct[k]);
			 }
			else if(searchProduct[k].price >= 100000 && searchProduct[k].price <= 500000 && searchtype == "price_11")
			 {
				 sproduct.push(searchProduct[k]);
			 }
				else if(searchProduct[k].price >= 500000 && searchProduct[k].price <= 1000000 && searchtype == "price_51")
			 {
				 sproduct.push(searchProduct[k]);
			 }
				else if(searchProduct[k].price >= 1000000 && searchProduct[k].price <= 2000000 && searchtype == "price_101")
			 {
				 sproduct.push(searchProduct[k]);
			 }
				else if(searchProduct[k].price >=2000000 && searchtype == "price_201")
			 {
				 sproduct.push(searchProduct[k]);
			 }
		}
		searchProduct = sproduct;
		callback(searchProduct);
	});
}
function typenameidNC(nameProduct,ttype,callback)
{
	var searchProduct = [];
	var sproduct = [];
	datanameid(nameProduct,function(result){
		searchProduct = result;
		for(var k = 0 ; k<searchProduct.length; k++)
		{
			if(ttype == searchProduct[k].type)
			{
				sproduct.push(searchProduct[k]);
			}
		}
			 searchProduct = sproduct;
			 sproduct = [];
			 callback(searchProduct);
	});
}
function	pricenameidNC(nameProduct,tprice,callback)
{
	var searchProduct = [];
	var sproduct = [];
	datanameid(nameProduct,function(result){
		searchProduct = result;
		for(var k = 0; k< searchProduct.length;k++)
		{
		 if(searchProduct[k].price <= 100000 && searchProduct[k].price > 0 && tprice == "price_1")
		 {
			 sproduct.push(searchProduct[k]);
		 }
		else if(searchProduct[k].price >= 100000 && searchProduct[k].price <= 500000 && tprice == "price_11")
		 {
			 sproduct.push(searchProduct[k]);
		 }
			else if(searchProduct[k].price >= 500000 && searchProduct[k].price <= 1000000 && tprice == "price_51")
		 {
			 sproduct.push(searchProduct[k]);
		 }
			else if(searchProduct[k].price >= 1000000 && searchProduct[k].price <= 2000000 && tprice == "price_101")
		 {
			 sproduct.push(searchProduct[k]);
		 }
			else if(searchProduct[k].price >=2000000 && tprice == "price_201")
		 {
			 sproduct.push(searchProduct[k]);
		 }
		}
		searchProduct = sproduct;
		sproduct = [];
		callback(searchProduct);
		//res.redirect("searchnangcao");
	});
}

function pricetypenameidNC(nameProduct,tprice,ttype,callback){
	var searchProduct = [];
	var sproduct = [];
	datanameid(nameProduct,function(result){
		searchProduct = result;
		for(var k = 0 ; k<searchProduct.length; k++)
		{
			if(ttype == searchProduct[k].type)
			{
				sproduct.push(searchProduct[k]);
			}
		}
			 searchProduct = sproduct;
			 sproduct = [];
			 for(var k = 0; k< searchProduct.length;k++)
			 {
				if(searchProduct[k].price <= 100000 && searchProduct[k].price > 0 && tprice == "price_1")
				{
					sproduct.push(searchProduct[k]);
				}
			 else if(searchProduct[k].price >= 100000 && searchProduct[k].price <= 500000 && tprice == "price_11")
				{
					sproduct.push(searchProduct[k]);
				}
				 else if(searchProduct[k].price >= 500000 && searchProduct[k].price <= 1000000 && tprice == "price_51")
				{
					sproduct.push(searchProduct[k]);
				}
				 else if(searchProduct[k].price >= 1000000 && searchProduct[k].price <= 2000000 && tprice == "price_101")
				{
					sproduct.push(searchProduct[k]);
				}
				 else if(searchProduct[k].price >=2000000 && tprice == "price_201")
				{
					sproduct.push(searchProduct[k]);
				}
			 }
		 searchProduct = sproduct;
		 sproduct = [];
		 callback(searchProduct);
		//res.redirect("searchnangcao");
	});
};

function allNC(nameProduct,callback)
{
	var searchProduct = [];
	var kt = true;
	datanameid(nameProduct,function(result){
		searchProduct = result;
		searchProductByType(nameProduct,function(result1){
			if (result1[0] == "e" || nameProduct == " ") {
				console.log("err");
				//searchProduct = [];
			} else {
				for(var i = 0; i<result1.length; i++)
				{
					for(var j = 0; j<searchProduct.length;j++)
					{
						if(result1[i].ID == searchProduct[j].ID)
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
						searchProduct.push(result1[i]);
					}
				}
				console.log("in ra mang search");
			}
		//	res.redirect('searchnangcao');
		callback(searchProduct);
		});
	});

}

function spaceAllNC(ttype,tprice,callback)
{
	var producttype = [];
	var productprice = [];
	var temp = [];
	productCollection(function(result){
			temp = result;
			if(ttype!= "")
			{
				producttype = temp.filter(x => x.type == ttype);
				if(tprice =="")
				{
					callback(producttype);
				}
			}
			if(tprice !="")
			{
				if(tprice == "price_1")
				{
					productprice = temp.filter(x => x.price <= 100000);
				}
				else if(tprice == "price_11")
				{
					productprice = temp.filter(x => x.price >= 100000 && x.price <= 500000)
				}
				else if(tprice == "price_51")
				{
					productprice = temp.filter(x => x.price >= 500000 && x.price <= 1000000)
				}
				else if(tprice == "price_101")
				{
					productprice = temp.filter(x => x.price >= 1000000 && x.price <= 2000000)
				}
				else if(tprice == "price_201")
				{
					productprice = temp.filter(x => x.price >= 2000000)
				}
				if(ttype =="")
				{
					callback(productprice);
				}
			}
			if(ttype != "" && tprice !="")
			{
				producttype = productprice.filter(x => x.type == ttype);
				callback(producttype);
			}
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
module.exports.searchType =searchType;
module.exports.searchProductByID =searchProductByID;
module.exports.searchAll = searchAll;
module.exports.searchPrice = searchPrice;
module.exports.datanameid = datanameid;
module.exports.typenameidNC = typenameidNC;
module.exports.pricenameidNC = pricenameidNC;
module.exports.pricetypenameidNC = pricetypenameidNC;
module.exports.allNC = allNC;
module.exports.spaceAllNC= spaceAllNC;
module.exports.searchProductByType =searchProductByType;
module.exports.searchProductByPrice =searchProductByPrice;
module.exports.updateProductByID =updateProductByID;
module.exports.removeProductByID =removeProductByID;
module.exports.findProductByType =findProductByType;
