var express = require("express"),
  router = express.Router(),
  Passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy
var typeproduct = require("../models/typeproduct");

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

router.get('/login', function(req, res) {
  console.log("login in routes");
  res.render('login/login.ejs', {
    error: " "
  })
});

router.post('/login', Passport.authenticate('local', {
  // failureRedirect: '/loginFailed',
  successRedirect: '/checkLogin',
  // successRedirect: '/loggedin',
  failureRedirect: '/loginFailed', // see text
  failureFlash: true // optional, see text as well
}));

router.get('/loginFailed', function(req, res) {
  console.log("loginfail");
  res.render('login/login.ejs', {
    error: "Invalid username or password !"
  });
});

router.get('/forgotPassword', function(req, res) {
  typeproduct.typeproductCollection(function(kq) {
    res.render('index', {
       typeproduct: kq,
       user: req.user,
       body: 'login/forgotPassword.ejs'
      });
    });
})


router.get('/checkLogin', function(req, res) {
  console.log(req.user);
  if (req.user.ID[0] != 's') {
    res.redirect("/");
  } else if (req.user.ID[0] == 's') {
    res.redirect("admin");
  }
});

module.exports = router;
