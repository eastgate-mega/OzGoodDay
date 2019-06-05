// import package
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    User        = require("./models/user"),
    itemRouter  = require('./routes/items'),
    loginRouter = require('./routes/login')

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

app.use('/items', itemRouter);
app.use('/', loginRouter);

// debug here
app.get('/', function(req, res){
  res.redirect('/items');
});

app.get('/product', function(req, res){
  res.render('productPage')
});

// start server here
app.listen(3000, 'localhost', function(){
  console.log('Server start!');
});