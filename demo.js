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

app.use(customerRouter);
app.use(indexRouter);
app.use(adminRouter);
app.use(emailRouter);
app.use(loginRouter);
app.use(productRouter);
app.use(cartAndPaymentRouter);


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
