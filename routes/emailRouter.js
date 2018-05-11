var express = require("express"),
  router = express.Router(),
  Passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy


var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient; // connect online
var uri = "mongodb+srv://duy:vippergod12@data-imllf.mongodb.net/test"; // connect online

var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({ // setting email for sender
  service: 'Gmail',
  auth: {
    user: 'nguyenthanhdai261097@gmail.com',
    pass: 'thanhdai123'
  }
});

//
// var passwordMail = require("../models/email.js");
// var passwordMail = new passwordMail()

var directName = require('../demo');
router.use(express.static(directName.dirname + '/Data'));



router.post('/email', function(req, res, next) {


  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("3dwebsite");
    dbo.collection("customer").update({
      email: req.body.email
    }, {
      $set: {
        password: 'ABCDE12345'
      }
    });
  });
  var Mail = require("../models/email.js");
  var sendMail = new Mail();
  sendMail.resetMail(req.body.email)


  transporter.sendMail(sendMail.mail, function(err, info) {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      console.log('Message sent: ' + info.response);
      res.redirect('/');
    }
  });
});



router.post('/email', function(req, res, next) {
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("3dwebsite");
    dbo.collection("customer").update({
      email: req.body.email
    }, {
      $set: {
        password: 'ABCDE12345'
      }
    });
  });


  transporter.sendMail(passwordMail, function(err, info) {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      console.log('Message sent: ' + info.response);
      res.redirect('/');
    }
  });
});



router.get('/verify?:ID', function(req, res) {
  var ID = req.query.ID;
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("3dwebsite");
    dbo.collect("customer").update({
      ID: ID
    }, {
      $set: {
        verify: 1
      }
    })
  })
  res.render('login', {
    error: "Tai khoan da kick hoat, vui long dang nhap lai"
  });
});

module.exports = router;
