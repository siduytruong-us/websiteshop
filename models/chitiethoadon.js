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

var app = express();
var session;


var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient; // connect online
var uri = "mongodb+srv://dat:vippergod12@data-imllf.mongodb.net/test"; // connect online



function chitiethoadonCollecttion(callback) { // customer
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("3dwebsite");
    dbo.collection("chitiethoadon").find().toArray(function(err, result) {
      if (err) {
        console.log(err);
      } else if (result.length > 0) {
        callback(result);
      }
    });
  });
}




module.exports.chitiethoadonCollecttion = chitiethoadonCollecttion
