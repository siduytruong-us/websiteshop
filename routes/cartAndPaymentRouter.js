var express = require("express"),
  router = express.Router()
var Cart = require('../models/cart.js');
var MongoClient = require('mongodb').MongoClient; // connect online
var uri = "mongodb+srv://duy:vippergod12@data-imllf.mongodb.net/test"; // connect online



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


// default direct for css and html bug not load
var directName = require('../demo');

router.use(express.static(directName.dirname + '/Data'));
//


router.post('/addToCart', function(req, res) {

  var soluong = req.body.soluong;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.add(info, soluong);

  req.session.cart = cart;
  console.log("My cart" + cart);
  // console.log("user cart" + session.cart.items[0].item.ID); // dung
  // console.log("length cart" + session.cart.items.length); // dung
  console.log("user name" + req.session.cart.items);
  console.log("Tong tien:" + cart.totalPrice());
  // console.log(cart.items[0].item.price);

  res.redirect('/danhsach?type=' + info.type);
});


router.get('/shopcart', function(req, res) { // ham index de vao web chinh
  // console.log("shop cart username: " + session.cart.username.ID);
  console.log("length in shopcart" + req.session);
  res.render("shopcart", {
    cart: req.session.cart,
    user: req.user || ""
  });
});

router.post('/checkout', isLoggedin, function(req, res) {
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  var total = cart.totalPrice();
  var soluong = req.body.quantity;
  console.log("soluong: " + soluong);
  res.render("hoadonKH", {
    user: req.user,
    cart: cart,
    total: total
  });
});


var hoadon = require('../models/hoadon');
hoadon.hoadonCollection(function(result) {
  console.log(result);
})


router.post('/checkout/hoadon', function(req, res) {
  var d = new Date();
   var date = ("0" + d.getDate()).slice(-2);
   var year = d.getFullYear();
  var month = ("0" + (d.getMonth() + 1)).slice(-2);
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  var hoten = req.user.hoten;
  var username = req.user.ID;
  var diachi = req.body.diachi;
  var email = req.body.email;
  var phone = req.body.phone;
  var time =  {
    date: date,
    month: month,
    year: year.toString()
  }
  var cart = cart;
  var total = cart.totalPrice();
  var customer =  {
    hoten: hoten,
    id: username,
    diachi: diachi,
  }

  MongoClient.connect(uri, function(err, db) {
 	 if (err) throw err;
 	 var dbo = db.db("3dwebsite");
 	 dbo.collection("hoadon").insert({
     ID: "2",
     time:time,
     total:total,
     customer:customer,
     dagiao: 0,
     danhsachsanpham: cart.items
   });
  });

});

router.get('/remove?:ID', function(req, res, next) {
  var productId = req.query.ID;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.remove(productId);
  req.session.cart = cart;
  res.redirect('/shopcart');
});


module.exports = router;
