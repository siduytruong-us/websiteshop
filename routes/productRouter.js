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

//asdaskdlsadklasd/

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


var searchProduct = new Array();

router.get('/searchProduct?:search', function(req, res) {
  var nameProduct = req.query.search;
  var searchtype = req.query.tproduct;
  console.log(searchtype);
  var sproduct = new Array();
  sproduct = [];
  searchProduct = [];
  var product = require('../models/product');

  console.log("nameProduct: " + nameProduct);
  if(searchtype == "name")
  {
       product.searchProductByName(nameProduct.toString(), function(result) {
      searchProduct = result;
      if (result[0] == "e" || nameProduct == " ") {
        searchProduct = [];
      } else {
        console.log(result.length);
        console.log("in ra mang search");
       //console.log(result);
      }
      res.redirect('searchSuccess');
    });
  }

  else if(searchtype == "id")
  {
       product.searchProductByID(nameProduct.toString(), function(result) {
      searchProduct = result;
      if (result[0] == "e" || nameProduct == " ") {
        searchProduct = [];
      } else {
        console.log("in ra mang search");
       // console.log(searchProduct);
      }
      res.redirect('searchSuccess');
    });
  }
  //price
  else if(searchtype == "price_1" || searchtype =="price_11"|| searchtype == "price_51" || searchtype == "price_101" || searchtype == "price_201")
    {
      var kt = true;
    product.searchProductByName(nameProduct.toString(), function(result) {
          //searchProduct = result;
          if (result[0] == "e" || nameProduct == " ") {
            //searchProduct = [];
          } else {
            searchProduct = result;
            console.log("in ra mang search");
           // console.log(searchProduct);
          }
          //res.redirect('searchSuccess');
      });
    product.searchProductByID(nameProduct.toString(), function(result) {
          //searchProduct = result;
          if (result[0] == "e" || nameProduct == " ") {
            //searchProduct = [];
          } else {
            for(var i = 0; i<result.length; i++)
            {
              for(var j = 0; j<searchProduct.length;j++)
              {
                if(result[i].ID == searchProduct[j].ID)
                {
                  kt = false;
                }
              }
              if(kt == false)
              {
                kt = true;
              }
              else
              {
                searchProduct.push(result[i]);
              }
            }
            console.log("in ra mang search");
          }
    });
    //type
    product.searchProductByType(nameProduct.toString(), function(result) {
          //searchProduct = result;
          if (result[0] == "e" || nameProduct == " ") {
            console.log("err");
            //searchProduct = [];
          } else {
            for(var i = 0; i<result.length; i++)
            {
              for(var j = 0; j<searchProduct.length;j++)
              {
                if(result[i].ID == searchProduct[j].ID)
                {
                  kt = false;
                }
              }
              if(kt == false)
              {
                kt = true;
              }
              else
              {
                searchProduct.push(result[i]);
              }
            }
                 console.log("in ra mang search");
                console.log(searchProduct.length);
               for(var k = 0; k< searchProduct.length;k++)
               {
                if(searchProduct[k].price <= 100000 && searchProduct[k].price > 0 && searchtype == "price_1")
                {
                  sproduct.push(searchProduct[k]);
                }
               else if(searchProduct[k].price >= 100000 && searchProduct[k].price <= 500000 && searchtype == "price_11")
                {
                  sproduct.push(searchProduct[k]);
                }
                 else if(searchProduct[k].price >= 500000 && searchProduct[k].price <= 1000000 && searchtype == "price_51")
                {
                  sproduct.push(searchProduct[k]);
                }
                 else if(searchProduct[k].price >= 1000000 && searchProduct[k].price <= 2000000 && searchtype == "price_101")
                {
                  sproduct.push(searchProduct[k]);
                }
                 else if(searchProduct[k].price >=2000000 && searchtype == "price_201")
                {
                  sproduct.push(searchProduct[k]);
                }
               }
          }
             searchProduct = sproduct;
            res.redirect('searchSuccess');
    });
  }
  //search type
  else if(searchtype == "mebe" || searchtype == "xe" || searchtype == "dientu" || searchtype == "fashion" || searchtype == "giadung" ||searchtype == "thucung")
  {
     product.searchProductByName(nameProduct.toString(), function(result) {
          //searchProduct = result;
          if (result[0] == "e" || nameProduct == " ") {
            //searchProduct = [];
          } else {
            searchProduct = result;
            console.log("in ra mang search");
          }
      });
    product.searchProductByID(nameProduct.toString(), function(result) {
          //searchProduct = result;
          if (result[0] == "e" || nameProduct == " ") {
            //searchProduct = [];
          } else {
            for(var i = 0; i<result.length; i++)
            {
              for(var j = 0; j<searchProduct.length;j++)
              {
                if(result[i].ID == searchProduct[j].ID)
                {
                  kt = false;
                }
              }
              if(kt == false)
              {
                kt = true;
              }
              else
              {
                searchProduct.push(result[i]);
              }
            }
            console.log("in ra mang search");
            console.log(searchProduct.length);
            for(var k = 0 ; k<searchProduct.length; k++)
            {
              if(searchtype == searchProduct[k].type)
              {
                sproduct.push(searchProduct[k]);
              }
            }
          }
         searchProduct = sproduct;
         res.redirect('searchSuccess');
    });
  }
  else if(searchtype == "all")
  {
    var kt = true;
    product.searchProductByName(nameProduct.toString(), function(result) {
          if (result[0] == "e" || nameProduct == " ") {

          } else {
            searchProduct = result;
            console.log("in ra mang search");
          }
      });
    product.searchProductByID(nameProduct.toString(), function(result) {
          //searchProduct = result;
          if (result[0] == "e" || nameProduct == " ") {
            //searchProduct = [];
          } else {
            for(var i = 0; i<result.length; i++)
            {
              for(var j = 0; j<searchProduct.length;j++)
              {
                if(result[i].ID == searchProduct[j].ID)
                {
                  kt = false;
                }
              }
              if(kt == false)
              {
                kt = true;
              }
              else
              {
                searchProduct.push(result[i]);
              }
            }
            console.log("in ra mang search");
          }
    });

    //type
    product.searchProductByType(nameProduct.toString(), function(result) {
          //searchProduct = result;
          if (result[0] == "e" || nameProduct == " ") {
            console.log("err");
            //searchProduct = [];
          } else {
            for(var i = 0; i<result.length; i++)
            {
              for(var j = 0; j<searchProduct.length;j++)
              {
                if(result[i].ID == searchProduct[j].ID)
                {
                  kt = false;
                }
              }
              if(kt == false)
              {
                kt = true;
              }
              else
              {
                searchProduct.push(result[i]);
              }
            }
            console.log("in ra mang search");
          }
          res.redirect('searchSuccess');
    });
  }
});

router.get('/searchSuccess', function(req, res) {
  var temp = searchProduct;
  //searchProduct = [];
  typeproduct.typeproductCollection(function(kq) {
    res.render('index', {
      typeproduct: kq,
      user: req.user,
    //  type: type,
      product: temp,
      body: 'product/danhsach.ejs'
    });
  });
});

router.get('/searchnangcao', function(req, res) {
  //searchProduct = [];
  var temp = searchProduct;
  searchProduct = [];
  typeproduct.typeproductCollection(function(kq) {
    res.render('index', {

      typeproduct: kq,
      user: req.user,
    //  type: type,
      product: temp,
      body: 'product/nangcao'
    });
  });
});

router.get('/searchnc?:search', function(req, res){
var nameProduct = req.query.search;
var tprice = req.query.tprice;
var ttype = req.query.ttype;
var tnameid = req.query.tnameid;
var sproduct = new Array();
sproduct = [];
searchProduct = [];
var product = require('../models/product');
  if(tprice =="" && ttype == "" && tnameid == "")
  {
    var kt = true;
    product.searchProductByName(nameProduct.toString(), function(result) {
          if (result[0] == "e" || nameProduct == " ") {

          } else {
            searchProduct = result;
            console.log("in ra mang search");
          }
      });
    product.searchProductByID(nameProduct.toString(), function(result) {
          //searchProduct = result;
          if (result[0] == "e" || nameProduct == " ") {
            //searchProduct = [];
          } else {
            for(var i = 0; i<result.length; i++)
            {
              for(var j = 0; j<searchProduct.length;j++)
              {
                if(result[i].ID == searchProduct[j].ID)
                {
                  kt = false;
                }
              }
              if(kt == false)
              {
                kt = true;
              }
              else
              {
                searchProduct.push(result[i]);
              }
            }
            console.log("in ra mang search");
          }
    });

    //type
    product.searchProductByType(nameProduct.toString(), function(result) {
          //searchProduct = result;
          if (result[0] == "e" || nameProduct == " ") {
            console.log("err");
            //searchProduct = [];
          } else {
            for(var i = 0; i<result.length; i++)
            {
              for(var j = 0; j<searchProduct.length;j++)
              {
                if(result[i].ID == searchProduct[j].ID)
                {
                  kt = false;
                }
              }
              if(kt == false)
              {
                kt = true;
              }
              else
              {
                searchProduct.push(result[i]);
              }
            }
            console.log("in ra mang search");
          }
          res.redirect('searchnangcao');
    });
  }
  else
  {
    if(tnameid !="" && tprice == "" && ttype =="")
    {
      product.datanameid(nameProduct,function(result){
        searchProduct = result;
        res.redirect("searchnangcao");
      });

    }

    else if((ttype != "" && tprice == "" && tnameid == "")|| (tnameid !="" && ttype!= "" && tprice == "" ))
    {
      product.datanameid(nameProduct,function(result){
        searchProduct = result;
        for(var k = 0 ; k<searchProduct.length; k++)
        {
          if(ttype == searchProduct[k].type)
          {
            sproduct.push(searchProduct[k]);
          }
        }
           searchProduct = sproduct;
           sproduct = [];
        res.redirect("searchnangcao");
      });

    }
    else if((tprice != "" && ttype == "" && tnameid =="")||(tprice !=""&&ttype ==""&&tnameid!=""))
    {
      product.datanameid(nameProduct,function(result){
        searchProduct = result;
        for(var k = 0; k< searchProduct.length;k++)
        {
         if(searchProduct[k].price <= 100000 && searchProduct[k].price > 0 && tprice == "price_1")
         {
           sproduct.push(searchProduct[k]);
         }
        else if(searchProduct[k].price >= 100000 && searchProduct[k].price <= 500000 && tprice == "price_11")
         {
           sproduct.push(searchProduct[k]);
         }
          else if(searchProduct[k].price >= 500000 && searchProduct[k].price <= 1000000 && tprice == "price_51")
         {
           sproduct.push(searchProduct[k]);
         }
          else if(searchProduct[k].price >= 1000000 && searchProduct[k].price <= 2000000 && tprice == "price_101")
         {
           sproduct.push(searchProduct[k]);
         }
          else if(searchProduct[k].price >=2000000 && tprice == "price_201")
         {
           sproduct.push(searchProduct[k]);
         }
        }
        searchProduct = sproduct;
        sproduct = [];
        res.redirect("searchnangcao");
      });
    }
    else if((ttype != "" && tprice != "" && tnameid != "")||(tprice != "" && ttype !=""&&tnameid==""))
    {
      console.log(tprice);
      product.datanameid(nameProduct,function(result){
        searchProduct = result;
        for(var k = 0 ; k<searchProduct.length; k++)
        {
          if(ttype == searchProduct[k].type)
          {
            sproduct.push(searchProduct[k]);
          }
        }
           searchProduct = sproduct;
           sproduct = [];
           for(var k = 0; k< searchProduct.length;k++)
           {
            if(searchProduct[k].price <= 100000 && searchProduct[k].price > 0 && tprice == "price_1")
            {
              sproduct.push(searchProduct[k]);
            }
           else if(searchProduct[k].price >= 100000 && searchProduct[k].price <= 500000 && tprice == "price_11")
            {
              sproduct.push(searchProduct[k]);
            }
             else if(searchProduct[k].price >= 500000 && searchProduct[k].price <= 1000000 && tprice == "price_51")
            {
              sproduct.push(searchProduct[k]);
            }
             else if(searchProduct[k].price >= 1000000 && searchProduct[k].price <= 2000000 && tprice == "price_101")
            {
              sproduct.push(searchProduct[k]);
            }
             else if(searchProduct[k].price >=2000000 && tprice == "price_201")
            {
              sproduct.push(searchProduct[k]);
            }
           }
         searchProduct = sproduct;
         sproduct = [];
        res.redirect("searchnangcao");
      });
    }
  }
});



module.exports = router;
