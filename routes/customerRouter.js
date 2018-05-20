var express = require("express"),
  router = express.Router()

var staff = require('../models/staff'),
  customer = require('../models/customer')

function isLoggedin(req, res, next) {
  if (req.user) {
    return next();
  } else {
    res.redirect('/login');
  }
}


// default direct for css and html bug not load
var directName = require('../demo');

router.use(express.static('/Data'));




router.get('/profile', isLoggedin, function(req, res) {
  res.render('customer/profile', {
    user: req.user
  })
});

router.get('/history', isLoggedin, function(req, res) {
  var hoadon = require('../models/hoadon');
  hoadon.hoadonCollection(function(result) {
    var temp = result.filter(x => x.customer.id === req.user.ID);
    res.render('index', {
      user: req.user,
      hoadon:temp,
      body: "customer/history.ejs",
      typeproduct: null
    })
  })
});

router.get('/chitiethoadon?:id', isLoggedin, function(req, res) {
  var  id = req.query.id;
  var hoadon = require('../models/hoadon');
  hoadon.hoadonCollection(function(result) {
    var temp = result.filter(x => x.ID == id);
        console.log(temp);
    res.render('index', {
      user: req.user,
      hoadon:temp,
      body: "customer/chitiethoadon.ejs",
      typeproduct: null
    })
  })
});
module.exports = router;
