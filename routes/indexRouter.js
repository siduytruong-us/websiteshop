var express = require("express"),
  router = express.Router(),
  Passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy
var nodemailer = require("nodemailer");
var MongoClient = require('mongodb').MongoClient; // connect online
var uri = "mongodb+srv://duy:vippergod12@data-imllf.mongodb.net/test"; // connect online
var typeproduct = require("../models/typeproduct"); ///// menu

var transporter = nodemailer.createTransport({ // config mail server
  service: 'Gmail',
  auth: {
    user: 'nguyenthanhdai261097@gmail.com',
    pass: 'thanhdai123'
  }
});

// default direct for css and html bug not load
var directName = require('../demo');
router.use(express.static(directName.dirname + '/Data'));
//

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

function isLoggedin(req, res, next) {
  if (req.user) {
    return next();
  } else {
    res.redirect('/login');
  }
}
//  Routes in Index
router.get('/', function(req, res) {
  typeproduct.typeproductCollection(function(kq) {
    console.log("index in router");
    res.render('index', {
      user: req.user,
      typeproduct: kq,
      body: 'product/index.ejs'
    });
  });
});


router.get('/me', function(req, res) {
  res.render("Aboutme");
});



// sign-up


router.get("/signup", function(req, res) {
  res.render("signup", {
    error: "true"
  });
});


router.get('/logout', function(req, res) { // ham index de vao web chinh
  req.logout();
  user = null;
  typeproduct.typeproductCollection(function(kq) {
    console.log("index in router");
    res.render('index', {
      user: user,
      typeproduct: kq,
      body: 'product/index.ejs'
    });
  });
});




router.post('/signup', function(req, res) {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var username = req.body.username;
  var password = req.body.password;
  var diachi = req.body.diachi;
  var email = req.body.email;
  var phone = req.body.phone;
  var hoten = firstname + " " + lastname;
  var check = true;
  var customer = require('../models/customer');

  customer.customerCollection(function(customer) {

    for (var i = 0; i < customer.length; i++) { //  check email da dang ki
      if (customer[i].ID == username || customer[i].email == email) {
        check = false;
      }
    }
    if (check == true) {

      MongoClient.connect(uri, function(err, db) {
        //var ids = "/"+nameProduct+"/";
        if (err) throw err;
        var dbo = db.db("3dwebsite");
        dbo.collection("customer").insert({
          ID: username,
          hoten: hoten,
          password: password,
          diachi: diachi,
          email: email,
          dienthoai: phone,
          verify: 0
        });
      });
      var link = "http://dudadawebshop.herokuapp.com/verify?ID=" + username;
      var sendMail = require("../models/email.js");

      var sendMail = new sendMail();
      sendMail.verifyMail(email, link);


      transporter.sendMail(sendMail.mail, function(err, info) {
        if (err) {
          console.log(err);
          res.redirect('/');
        } else {
          console.log('verifyMail sent: ' + info.response);
          res.redirect('/login');
        }
      });
    } else {
      res.redirect('/signupFail');
    }
  });



});

router.get('/signupFail', function(req, res) {
  res.render('signup', {
    error: "Username hoặc email đã được đăng kí"
  });
});


router.post("/fileupload", function(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    var oldpath = files.filetoupload.path;
    var newpath = 'C:/Users/Your Name/' + files.filetoupload.name;
    fs.rename(oldpath, newpath, function(err) {
      if (err) throw err;
      res.write('File uploaded and moved!');
      res.end();
    });

  });

})
router.get('/upload', function(req, res) {
  res.render('upload');
})


module.exports = router;
