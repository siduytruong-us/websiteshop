var mysql = require('mysql');
var express = require('express');
var sessions = require('express-session');
var http = require('http');
var fs = require('fs');
var url = require('url');
var bodyParser = require('body-parser');
var path = require('path');
var link = __dirname;
var nodemailer = require("nodemailer");
const PORT = process.env.PORT || 80;

var app = express();
var session;

var Staff = require('./models/staff');

var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient; // connect online
var uri = "mongodb+srv://dat:vippergod12@data-imllf.mongodb.net/test"; // connect online

console.log(PORT);

var app = require('express')();
var server = require('http').Server(app);


server.listen(PORT);
var connection;


function chitiethoadoncollect(callback) { // customer
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("shopping");
    dbo.collection("chitiethoadon").find().toArray(function(err, result) {
      if (err) {
        console.log(err);
      } else if (result.length > 0) {
        callback(result);
      }
    });
  });
}

// var dbo = db.db("shopping");
// db.collection("chitiethoadon").aggregate([{$group : {_id : "$idsp", tongso : {$sum : "$soluong"}}}])

var product;
chitiethoadoncollect(function(result)
{
	product = result;
	console.log(product[0]);
});

function gettop10(callback) {
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("shopping");
		dbo.collection("chitiethoadon").aggregate([{$group : {_id : "$idsp", tongso : {$sum : "$soluong"}}}]).toArray(function(err, result) {
      if (err) {
        console.log(err);
      } else if (result.length > 0) {
        callback(result);
      }
    });
  });
}

function InsertSort(top)
{
	var t,j,temp,k;
	for(var i=1;i<top.length;i++)
	{
		j=i-1;
		t=top[i].tongso;
		//k=top[j].tongso;
		temp = top[i];
		while(top[j].tongso > t && j>=0)
		{
			top[j+1]=top[j];
			j--;
		}
		top[j+1]=temp;
	}
}

var top;
gettop10(function(result){
	top = result
	console.log("top10:");
	InsertSort(top);
	console.log(top);
});
