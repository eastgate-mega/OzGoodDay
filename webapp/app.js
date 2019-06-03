// import package
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    User        = require("./models/user"),
    Item        = require('./models/item')

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

// debug here
app.get('/', function(req, res){
  res.redirect('/items');
});

app.get('/product', function(req, res){
  res.render('productPage')
});




// ==============
// AUTH ROUTE 
// ==============
// show register form
app.get('/register', function(req, res){
  res.render('login/register');
});

// show login form
app.get("/login", function(req, res){
  res.render("login/login"); 
});

//handling user sign up
app.post("/register", function(req, res){
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
      if(err){
          console.log(err);
          res.send(err.message);
          return res.render('login/register');
      }
      passport.authenticate("local")(req, res, function(){
         res.redirect("/secret");
      });
  });
});

//login logic
//middleware
app.post("/login", passport.authenticate("local", {
  successRedirect: "/secret",
  failureRedirect: "/login"
}) ,function(req, res){
});

app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

// secret page for user only
app.get("/secret",isLoggedIn, function(req, res){
  
  res.render("login/secret");
});

//INDEX ROUTES
app.get('/items', function(req, res){
  Item.find({}, function(err, items){
    if (err) {
      console.log(err);
      
    } else {
      res.render('item/index', {items: items});
    }
  });
});

//ITEM ROUTES
//show create item page
app.get('/items/new', function(req, res){
  res.render('item/new');
});

//create item logic
app.post('/items', function(req, res){
  Item.create(req.body.item, function(err, item){
    if (err) {
      console.log(err);
      
    } else {
      res.redirect('/items');
    }
  })
});

//show item
app.get('/items/:id', function(req, res){
  Item.findById(req.params.id, function(err, item){
    if (err) {
      console.log(err);
      
    } else {
      res.render('item/show', {item: item});
    }
  });
  
});


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect("/login");
}


// start server here
app.listen(3000, 'localhost', function(){
  console.log('Server start!');
});