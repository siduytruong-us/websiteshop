var express = require('express');
var sessions = require('express-session');
var url = require('url');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const PORT = process.env.PORT || 80;

var session;



var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient; // connect online
var uri = "mongodb+srv://duy:vippergod12@data-imllf.mongodb.net/test"; // connect online

console.log(PORT);

var app = require('express')();
var server = require('http').Server(app);


server.listen(PORT);
var connection;


app.use(sessions({
  secret: '(!)*#(!JE)WJEqw09ej12',
  resave: false,
  saveUninitialized: true
}));


const dirname = __dirname;
module.exports = {
  dirname: dirname
}
app.use(express.static(dirname + '/Data'));

var Passport = require("./models/Passport");
var LocalStrategy = require("passport-local").Strategy;
app.use(Passport.initialize());
app.use(Passport.session())

app.set("view engine", "ejs");
app.set("views", "./views")

var indexRouter = require('./routes/indexRouter.js');
var adminRouter = require('./routes/adminRouter.js');
var emailRouter = require('./routes/emailRouter.js');
var loginRouter = require('./routes/loginRouter.js');
var customerRouter = require('./routes/customerRouter.js');
var productRouter = require('./routes/productRouter.js');
var cartAndPaymentRouter = require('./routes/cartAndPaymentRouter.js');
var customerManager = require('./routes/admin/customerManager');
var thongKe = require('./routes/admin/thongkeRouter');
var productManager = require('./routes/admin/productManager');
app.use(customerRouter);
app.use(indexRouter);
app.use(adminRouter);
app.use(emailRouter);
app.use(loginRouter);
app.use(productRouter);
app.use(cartAndPaymentRouter);
app.use(customerManager);
app.use(thongKe);
app.use(productManager);
//
//
//
// // Error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(req, res, next) {
//     res.locals.session = req.session;
//     next();
// });
//
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//   res.render('errorPage', {
//     error : err.message
//   });
// });


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
