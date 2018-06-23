var express = require("express"),
  router = express.Router()




router.get('/change-lang/:lang', (req, res) => {

      res.cookie('lang', req.params.lang, { maxAge: 900000 });
      console.log( req.params.lang);
      res.redirect('back');
});


module.exports = router;
