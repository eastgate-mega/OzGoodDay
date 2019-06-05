// import package
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    itemRouter  = require('./routes/items'),
    customerRouter = require('./routes/customer'),
    indexRouter = require('./routes/index')

// MONGOOSE CONFIG
mongoose.connect("mongodb://localhost/webapp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


// use router
app.use('/items', itemRouter);
app.use('/', customerRouter);
app.use('/', indexRouter);


// start server here
app.listen(3000, 'localhost', function(){
  console.log('Server start!');
});