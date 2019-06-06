// import package
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    itemRouter  = require('./routes/items'),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    customerRouter = require('./routes/customer'),
    indexRouter = require('./routes/index'),
    User    = require('./models/user')

// MONGOOSE CONFIG
mongoose.connect("mongodb://localhost/webapp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "Once again Rusty wins cutest dog!",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//local var 'currentUser'.
//SHIT, the global var must define before router!!!!!!
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

// use router
app.use('/items', itemRouter);
app.use('/', customerRouter);
app.use('/', indexRouter);



// start server here
app.listen(3000, 'localhost', function(){
  console.log('Server start!');
});