var express = require("express"),
  router = express.Router()
var MongoClient = require('mongodb').MongoClient; // connect online
var uri = "mongodb+srv://duy:vippergod12@data-imllf.mongodb.net/test"; // connect online
var chitiethoadon = require('../../models/chitiethoadon'); /////// chi tiet hoa don

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

router.get('/admin/top10', isAdminLoggedin, function(req, res) {
  chitiethoadon.chitiethoadonGroup(function(result) {
    result.sort((a, b) => b.tongso - a.tongso);
    res.render("manage", {
      user: req.user,
      top10Product: result,
      n: result.length<=10 ? result.length : 10,
      body: "staff/top10.ejs",
    });
  });
});


var doanhthuTheoNam;
router.get('/admin/chart', isAdminLoggedin, function(req, res) {

  var thongke = require('../../models/hoadon');

  thongke.TongDoanhThu(function(result) {
    tongdoanhthu = result

  });
  thongke.DoanhThuThangInYear(2018, function(result) {
    doanhthuTheoNam = result;
  })
  console.log();

  setTimeout(function() {
    res.render("staff/chart", {
      tongdoanhthu: tongdoanhthu,
      doanhthuTheoNam: doanhthuTheoNam,
      user: req.user
    })
  }, 3000);

});

module.exports = router;
