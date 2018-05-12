var express = require("express"),
 router = express.Router()
var MongoClient = require('mongodb').MongoClient; // connect online
var uri = "mongodb+srv://duy:vippergod12@data-imllf.mongodb.net/test"; // connect online

var directName = require('../../demo');
router.use(express.static('/Data'));


var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));



function isAdminLoggedin(req, res, next) {
  if (req.isAuthenticated() && req.user.ID[0] == 's') {
    return next();
  }
  res.redirect('/');
}


router.get('/admin/gianhang', isAdminLoggedin, function(req, res) {
  res.render('staff/productManagement', {
    user: req.user
  })
});

router.get('/admin/product?:type', isAdminLoggedin, function(req, res) {
  console.log(directName.dirname);
  var type = req.query.type;
  var product = require('../models/product')
  product.findProductByType(type, function(result) {
    product = result;
    console.log("type danh sach trong admin: " + type);
    res.render('staff/products', {
      user: req.user,
      type: type,
      product: product
    });
  });
});
