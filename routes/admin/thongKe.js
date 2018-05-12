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




// router.get('/admin/top10', function(req, res) {
//
//
//   res.render("staff/quanlysanpham", {
//     product: top.gettop10(),
//     user: req.user
//   });
// });

function thongKe(danhsach, type) {
  var count = 0;
  var temp = danhsach.filter(x => x.item.type === type);
  for (var j = 0; j < temp.length; j++) {
    count = temp[j].quantity;
  }
  return count
}



router.get('/admin/chart', function(req, res) {
  var hoadon = require('../../models/hoadon')
  var tongket = {
    giadung: 0,
    fashion: 0,
    mebe: 0,
    thucung: 0,
    xe: 0,
    dientu: 0,
  }
  hoadon.hoadonCollection(function(result) {


    var a = JSON.stringify(danhsach)
    console.log("danh sach : " + a);
    for (var i = 0; i < result.length; i++) {
      var danhsach = result[i].danhsachsanpham;
      tongket["giadung"] += parseInt(thongKe(danhsach, "giadung"));
      tongket["fashion"] += parseInt(thongKe(danhsach, "fashion"));

      tongket["thucung"] += parseInt(thongKe(danhsach, "thucung"));
      tongket["xe"] += parseInt(thongKe(danhsach, "xe"));

      tongket["dientu"] += parseInt(thongKe(danhsach, "dientu"));
      tongket["mebe"] += parseInt(thongKe(danhsach, "mebe"));
    }
    var sum = 0 ;
     for ( var each in tongket) {
       sum += tongket[each]
     }

    res.render('staff/chart', {
      tongket: tongket,
      tongSP: sum,
      user: req.user
    });
  });
});


module.exports = router;
