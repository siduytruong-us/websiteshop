var Card = require('../models/card');
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;  // connect online
var uri = "mongodb+srv://dat:vippergod12@data-imllf.mongodb.net/test"; // connect online

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/shopping');

var card = [
	new Card({
		name : 'Trần Tấn Đạt',
		ID : 'card01',
	}),
	new Card({
		name : 'Trương Sĩ Duy',
		ID : 'card02',
	}),
	new Card({
		name : 'Nguyễn Thanh Đại',
		ID : 'card03',
	}),
];

MongoClient.connect(uri, function(err, db)
{
  if (err) throw err;
    var dbo = db.db("3dwebsite");
		for(var i = 0; i< card.length; i++)
	    dbo.collection("card").insertOne(card[i], function(err, res)
			{
	      if (err) throw err;
	    });
		db.close();
		console.log("document inserted");
});
