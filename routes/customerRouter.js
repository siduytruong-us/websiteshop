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

router.get('/customer/history', isLoggedin, function(req, res) {
  var hoadon = require('../models/hoadon');
  hoadon.hoadonCollection(function(result) {
    var temp = result.filter(x => x.customer.id === req.user.ID);
    res.render('customer/history', {
      user: req.user,
      hoadon:temp
    })
  })
});
module.exports = router;
