var express = require("express"),
  router = express.Router(),
  Passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  mongoose = require('mongoose'),
  MongoClient = require('mongodb').MongoClient, // connect online
  uri = "mongodb+srv://duy:vippergod12@data-imllf.mongodb.net/test", // connect online
  crypto = require('crypto-js')

var staff = require('./staff'),
  customer = require('./customer')
var pass;
//sua
Passport.use(new LocalStrategy(
  (username, password, done) => {
    console.log('passport pass: '+ password);

    var temp;
    if (username[0] != 's') {

      customer.customerCollection(function(result) {
        temp = result;

        var user = temp.filter(x => x.ID === username);

        if (!user[0]) {
          return done(null, false);
        }
        if (user[0].password != password) {//user[0] là database password là trên ejs
          return done(null, false)
        }
        return done(null, user[0]);
      });
    } else {
      staff.staffCollection(function(result) {
        temp = result;

        user = temp.filter(x => x.ID === username);

        if (!user[0]) {
          return done(null, false);
        }
        if (user[0].password != password) {
          return done(null, false)
        }
        return done(null, user[0]);
      });
    }
  }
)) // MongoClient


Passport.serializeUser((user, done) => {

  done(null, user.ID)
})
Passport.deserializeUser((id, done) => {

  var myVar = "ID";
  var params = {};
  params[myVar] = id;
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    if (id[0] != 's') {
      var dbo = db.db("3dwebsite");
      dbo.collection("customer").find(params).toArray(function(err, result) {
        var bytes = crypto.AES.decrypt(result[0].password,'dudada');
        pass = bytes.toString(crypto.enc.Utf8);
        result[0].password = pass;
        pass = null;
        done(err, result[0]);
      });
    } else if (id[0] == 's') {
      var dbo = db.db("3dwebsite");
      dbo.collection("staff").find(params).toArray(function(err, result) {
        var bytes = crypto.AES.decrypt(result[0].password,'dudada');
        pass = bytes.toString(crypto.enc.Utf8);
        result[0].password = pass;
        pass = null;
        done(err, result[0]);

      });
    }
    db.close();
  });
});


module.exports = Passport;
