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

router.get('/admin/quanlysanpham?:type', isAdminLoggedin, function(req, res) {
  console.log(directName.dirname);
  var type = req.query.type;
  var product = require('../../models/product')
  product.findProductByType(type, function(result) {
    console.log("type danh sach trong admin: " + type);
    res.render('staff/quanlysanpham', {
      user: req.user,
      type: type,
      product: result
    });
  });
});

function findProduct(idsp, callback) { // customer
  MongoClient.connect(uri, function(err, db) {

    if (err) throw err;
    var dbo = db.db("3dwebsite");
    dbo.collection("product").findOne({
      ID: idsp
    }, function(err, result) {
      if (err) {
        console.log(err);
        throw err;
        callback("errorIDproduct");
      } else {
        callback(result);
      }
    });
  });
}

var proresult;
router.post('/admin/findProduct', isAdminLoggedin, function(req, res) { //
  var idProduct = req.body.idProduct;

  findProduct(idProduct, function(result) {
    if (result == "e" || result == null) {
      console.log("find Failed Product");
      res.redirect('/admin/findFailedProcduct');
    } else {
      console.log("findProduct" + result);
      proresult = result;
      res.redirect('/admin/findSuccessProduct');
    }
  });
});

router.get('/admin/findSuccessProduct', isAdminLoggedin, function(req, res) { //
  res.render('staff/quanlysanpham', {
    user: req.user,
    product: product,
    productresult: proresult,
    flag: true,
  });
});

router.get('/admin/findFailedProduct', isAdminLoggedin, function(req, res) { //
  res.render('staff/quanlysanpham', {
    user: req.user,
    product: product,
    productresult: proresult,
    flag: false,
  });
});

function updatePro(id, name, info, price, link) { // customer
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
        link: link,
      }
    }, {
      multi: true
    });
  });
}

var updateProduct;
router.get('/admin/updateProduct?:ID', isAdminLoggedin, function(req, res) { //
  console.log("ID: "+req.query.ID);
  findProduct(req.query.ID, function(result) {
    res.render('staff/updateProduct', {
      user: req.user,
      updateProduct: result,
    });
  });
})


router.post('/admin/adminUpdateProduct', isAdminLoggedin, function(req, res) { //
  var idsp = req.body.ID;
  var type = req.body.type;
  var name = req.body.name;
  var info = req.body.info;
  var price = req.body.price;
  var link  = req.body.link;
  updatePro(idsp, name, info, price, link);
  console.log("Update Success Product");
  var product = require('../../models/product')
  product.findProductByType(type, function(result) {
    console.log("type danh sach trong admin: " + type);
    res.render('staff/quanlysanpham', {
      user: req.user,
      type: type,
      product: result
    });
  });
});

function removeProduct(id) { // customer
  MongoClient.connect(uri, function(err, db) {
    //var ids = "/"+nameProduct+"/";
    if (err) throw err;
    var dbo = db.db("3dwebsite");
    dbo.collection("product").remove({
      ID: id
    });
  });
}

var idsp;
var type;
router.get('/admin/removeProduct?:ID', isAdminLoggedin, function(req, res) { //, isAdminLoggedin
  idsp = req.query.ID;
  for(var i=0;i<idsp;i++)
  {
    if(idsp[i]>='0'&&idsp[i]<='9')
    {
      break;
    }
    else
    {
        type+=idsp[i];
    }
  }
  removeProduct(idsp);
  console.log("remove product Success" + idsp + type);
  res.redirect('/admin/gianhang');
  //res.redirect('/admin/removeProductSuccess'); //bo tay, sai
  console.log("test");
});

router.get('/admin/removeProductSuccess', isAdminLoggedin, function(req, res) { //, isAdminLoggedin

    var product = require('../../models/product')
    product.findProductByType(type, function(result) {
      console.log("type danh sach trong admin: " + type);
      res.render('staff/quanlysanpham', {
        user: req.user,
        type: type,
        product: result
      });
    });
  type = null;
  console.log("180 "+type + idsp);
});   /// sai r, bo tay r

module.exports = router;
