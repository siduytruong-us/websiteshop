var express = require("express"),
  router = express.Router(),
  Passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy
var typeproduct = require("../models/typeproduct"); ///// menu

var MongoClient = require('mongodb').MongoClient; // connect online
var uri = "mongodb+srv://duy:vippergod12@data-imllf.mongodb.net/test"; // connect online


var url = require('url');
var bodyParser = require('body-parser');


// default direct for css and html bug not load
var directName = require('../demo');
console.log(directName.dirname);
router.use(express.static(directName.dirname + '/Data'));
//



router.get('/danhsach?:type', function(req, res) { // ham index de vao web chinh
  var type = req.query.type;
  var product = require('../models/product')
  product.findProductByType(type, function(result) {
    product = result;
    console.log("type danh sach: " + type);
    typeproduct.typeproductCollection(function(kq) {
      res.render('index', {
        typeproduct: kq,
        user: req.user,
        type: type,
        product: product,
        body: 'product/danhsach.ejs'
      });
    });
  });
});


router.get('/chitietsanpham?:ID', function(req, res) { // ham index de vao web chinh
  var ID = req.query.ID;
  console.log(ID);
  var product = require('../models/product');
  var OtherProducts = [];
  product.productCollection(function(result) {
    product = result;
    for (var i = 0; i < product.length; i++) {
      if (product[i].ID == ID) {
        info = product[i]
      }
    }

    for (var i = 0; i < product.length; i++) {
      if (product[i].type == info.type && product[i].ID != info.ID) {
        OtherProducts.push(product[i]);
      }

    }
    type = null;
    typeproduct.typeproductCollection(function(kq) {
      res.render('index', {
        typeproduct: kq,
        user: req.user,
        infoProduct: info,
        product: OtherProducts,
        body: "product/chitietsanpham"
      });
    });
  });
});

router.get('/updateProduct', function(req, res) {

  res.render('staff/updateProduct', {
    flag: false,
    update: null,
    error: "Vui lòng nhập chính xác ID của sản phẩm để cập nhật"
  });
});

router.get('/removeProduct', function(req, res) {
  var customer = require('../models/customer');

  customer.removeProductByID(update[0].ID);
  console.log("remove Success");
  update = null;
  res.redirect('removeSuccess')

});

router.get('/updateSuccess', function(req, res) {
  res.render('staff/updateProduct', {
    flag: false
  });
})

router.get('/removeSuccess', function(req, res) {
  res.render('staff/updateProduct', {
    flag: false
  });
})


var searchProduct;
router.get('/searchProduct?:search', function(req, res) {
  var nameProduct = req.query.search;
  var product = require('../models/product');

  console.log("nameProduct: " + nameProduct);

  product.searchProductByName(nameProduct.toString(), function(result) {
    searchProduct = result;
    if (result[0] == "e" || nameProduct == " ") {
      searchProduct = [];
    } else {
      console.log("in ra mang search");
      console.log(searchProduct);
    }
    res.redirect('searchSuccess');
  });
});

router.get('/searchSuccess', function(req, res) {
  var temp = searchProduct;
  //searchProduct = [];
  typeproduct.typeproductCollection(function(kq) {
    res.render('index', {
      typeproduct: kq,
      user: req.user,
      type: type,
      product: temp,
      body: 'product/danhsach.ejs'
    });
  });
});



module.exports = router;
