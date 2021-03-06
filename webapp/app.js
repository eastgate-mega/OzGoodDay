// import package
const express     = require("express"),
      app         = express(),
      bodyParser  = require("body-parser"),
      mongoose    = require("mongoose"),
      passport    = require("passport"),
      session     = require('express-session'),
      LocalStrategy = require("passport-local"),
      User        = require('./models/user'),
      mongoStore  = require('connect-mongo')(session),
      router      = require('./routes/router')

// MONGOOSE CONFIG
mongoose.connect("mongodb://localhost/webapp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


// PASSPORT CONFIGURATION
// session config
app.use(session({
  secret: "OzGoodDay WebApp",
  resave: false,
  saveUninitialized: false,
  session: new mongoStore({ mongooseConnection: mongoose.connection}),
  cookie: {maxAge: 180 * 60 * 1000 }//180 mins, 60s, 1000 ms
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
  res.locals.session = req.session;
  next();
});

router(app);

// start server here
app.listen(3000, 'localhost', function(){
  console.log('Server start!');
});