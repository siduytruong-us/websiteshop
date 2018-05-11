var Customer = require('../models/customer');
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;  // connect online
var uri = "mongodb+srv://dat:vippergod12@data-imllf.mongodb.net/test"; // connect online

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/shopping');

var customer = [
	new Customer({
		ID : 'kh01',
		password : 123,
		hoten : 'Nguyễn Thị Mĩ',
		diachi  : 'Hồ Chí Minh',
		email  : 'ntmi@gmail.com',
		dienthoai  : '0912342233',
	}),
	new Customer({
		ID : 'kh02',
		password : 1254,
		hoten : 'Lê Văn A',
		diachi  : 'Hồ Chí Minh',
		email  : 'lva@gmail.com',
		dienthoai  : '0912343433',
	}),
];

MongoClient.connect(uri, function(err, db)
{
  if (err) throw err;
    var dbo = db.db("3dwebsite");
		for(var i = 0; i< customer.length; i++)
	    dbo.collection("customer").insertOne(customer[i], function(err, res)
			{
	      if (err) throw err;
	    });
		db.close();
		console.log("document inserted");
});
