var Feedback = require('../models/feedback');
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;  // connect online
var uri = "mongodb+srv://dat:vippergod12@data-imllf.mongodb.net/test"; // connect online

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/shopping');

var feedback = [
	new Feedback({
		ID : 'fb01',
		name : 'Nguyễn Thị Mĩ',
		dienthoai : '0912342233',
		email  : 'ntmi@gmail.com',
		noidung : 'Website rất tốt, chất lượng phục vụ ok, giá cả rất cạnh tranh',
		date  : '21/04/2018',
		status: 12,
	}),
];

MongoClient.connect(uri, function(err, db)
{
  if (err) throw err;
    var dbo = db.db("3dwebsite");
		for(var i = 0; i< feedback.length; i++)
	    dbo.collection("feedback").insertOne(feedback[i], function(err, res)
			{
	      if (err) throw err;
	    });
		db.close();
		console.log("document inserted");
});
