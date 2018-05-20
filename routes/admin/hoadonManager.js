var express = require("express"),
  router = express.Router()

var staff = require('../../models/staff'),
  customer = require('../../models/customer')

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


// default direct for css and html bug not load
var directName = require('../../demo');

router.use(express.static(directName.dirname + './Data'));
//


router.get('/admin/hoadon', isAdminLoggedin, function(req, res) {
  var hoadon = require('../../models/hoadon');
  console.log("dirname adminrouter" + __dirname);
  hoadon.hoadonCollection(function(result) {
    res.render('manage', {
      user: req.user,
      hoadon: result,
      body: "staff/hoadonAdmin.ejs"
    })
  });
});



router.post('/admin/search', isAdminLoggedin, function(req, res) {
  var ID = req.body.hoadon;
  var hoadon = require('../../models/hoadon');
  hoadon.hoadonCollection(function(result) {
    var temp = result.filter(x => x.ID == ID);
    res.render('manage', {
      user: req.user,
      hoadon: temp,
      body: "staff/hoadonAdmin.ejs"
    })
  });

});

router.get('/admin/chitiethoadon?:id', isAdminLoggedin, function(req, res) {
  var ID = req.query.id;
  console.log(ID);
  var hoadon = require('../../models/hoadon');
  hoadon.hoadonCollection(function(result) {
    var temp = result.filter(x => x.ID == ID);
    console.log(temp);
    res.render('manage', {
      user: req.user,
      hoadon: temp,
      body: "staff/chitiethoadon.ejs"
    })
  });
});


router.get('/admin/hoadon/delivery',isAdminLoggedin, function(req, res) {
  var ID = req.query.ID;
  var dagiao = req.query.dagiao;
  console.log("delivery : " + ID + dagiao);
  var hoadon = require('../../models/hoadon');
  hoadon.updateHoaDonByID(ID, dagiao);
  res.redirect('back');
});




module.exports = router
