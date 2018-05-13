var express = require("express"),
  router = express.Router()

var staff = require('../models/staff'),
  customer = require('../models/customer')

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
var directName = require('../demo');

router.use(express.static('/Data'));
//
var update;
router.post('/findProduct', function(req, res) {
  var idProduct = req.body.idProduct;

  product.findItemByID(idProduct, function(result) {
    if (result == "e" || result == null) {
      console.log("find Failed");
      res.redirect('findFailed');
    } else {
      console.log("findProduct" + result);
      update = result;
      res.redirect('findSuccess');
    }
  });
});

router.get('/findSuccess', function(req, res) {
  res.render('staff/updateProduct', {
    update: update,
    flag: true,
    error: ""
  });
});

router.get('/findFailed', function(req, res) {
  res.render('staff/updateProduct', {
    update: update,
    flag: false,
    error: "Không tìm thấy sản phẩm"
  });
});


router.post('/update', function(req, res) {
  var name = req.body.name;
  var price = req.body.price;
  var link = req.body.link;
  var info = req.body.info;
  product.updateProductByID(update[0].ID, name, info, price, link);
  console.log("Update Success");
  res.redirect('updateSuccess')
  update = null;
});


router.get('/admin', isAdminLoggedin, function(req, res) { // ham index de vao web chinh
  console.log("admin login index: " + req.user);
  if (req.user == null) {
    res.render('index', {
      user: null
    });
  } else {
    if (req.user.ID[0] == 's') {
      res.render('staff/admin', {
        user: req.user
      });
    } else {
      res.render('index', {
        user: null
      });
    }
  }
});




router.get('/addProduct', isAdminLoggedin, function(req, res) {
  res.render("staff/addProduct", {
    Test: null
  });
});


router.post('/addProduct', function(req, res) {
  res.render("staff/addProduct", {
    Test: null
  });
});

router.get('/admin/hoadon', function(req, res) {
  var hoadon = require('../models/hoadon');
  console.log("dirname adminrouter" +__dirname);
  hoadon.hoadonCollection(function(result) {
    res.render('staff/hoadonAdmin', {
      user: req.user,
      hoadon: result
    })
  });

});

router.post('/search/hoadon', function(req, res) {
  var ID = req.body.hoadon;
  var hoadon = require('../models/hoadon');
  hoadon.hoadonCollection(function(result) {
    var temp = result.filter(x => x.ID === ID);
    res.render('staff/hoadonAdmin', {
      user: req.user,
      hoadon: temp
    })
  });

});

router.get('/admin/chitiethoadon?:id', function(req, res) {
  var ID = req.query.id;
  console.log(ID);
  var hoadon = require('../models/hoadon');
  hoadon.hoadonCollection(function(result) {

    var temp = result.filter(x => x.ID === ID);
    console.log(temp);
    res.render('staff/chitiethoadon', {
      user: req.user,
      hoadon: temp
    })
  });
});


router.get('/admin/hoadon/delivery', function(req, res) {
  var ID = req.query.ID;
  var dagiao =  req.query.dagiao;
  console.log( "delivery : " +ID + dagiao);
  var hoadon = require('../models/hoadon');


});







// res.render('staff/chart', {
//   user: req.user,
//   product: product
// });

module.exports = router;
