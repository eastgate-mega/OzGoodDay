// import package
var express     = require("express"),
    app         = express(),
    mysql       = require('mysql'),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    User        = require("./models/user");


// MySQL CONFIG
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123',
  database: 'ozgooddaydb'
});

db.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + db.threadId);
});

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

// // create a database here
app.get('/createDB', function(req, res){
  let sql = 'CREATE DATABASE ozgooddaydb';
  db.query(sql, function(err, result){
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send('success');
    }
  });
});

// create a new table here
app.get('/createTableUser', function(req, res){
  let sql = 'CREATE TABLE user(id int(45) AUTO_INCREMENT, name varchar(90) NOT NULL, email varchar(45) NOT NULL, password varchar(45) NOT NULL, PRIMARY KEY (id))';
  db.query(sql, function(err, result){
    if (err) {
      throw err
    } else {
      console.log(result);
      res.send('table created');
    }
  });
});

// insert user
app.get('/addUser', function(req, res){
  var user = {
    name: 'test2',
    email: '2',
    password: '2'
  };
  let sql = 'INSERT INTO user SET ?';
  let query = db.query(sql, user, function(err, result){
    if (err) {
      throw err
    } else {
      console.log(result);
      res.send('test2 added');
    }
  });
});

//select user
app.get('/selectUser', function(req, res){
  let sql = 'SELECT * FROM user';
  let query = db.query(sql, function(err, result){
    if (err) {
      throw err
    } else {
      console.log(result);
      res.send('user fectched');
    }
  });
});

//select single user
app.get('/selectUser/:id', function(req, res){
  let sql = `SELECT * FROM user WHERE id = ${req.params.id}`;
  let query = db.query(sql, function(err, result){
    if (err) {
      throw err
    } else {
      console.log(result);
      res.send('user fectched');
    }
  });
});

//update single user
app.get('/selectUser/:id/edit', function(req, res){
  var newName = 'jimmyNew'
  let sql = `UPDATE user SET name = '${newName}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, function(err, result){
    if (err) {
      throw err
    } else {
      console.log(result);
      res.send('user info updated');
    }
  });
});

//delete single user
app.get('/deleteUser/:id', function(req, res){
  var newName = 'jimmyNew'
  let sql = `DELETE FROM user WHERE id = ${req.params.id}`;
  let query = db.query(sql, function(err, result){
    if (err) {
      throw err
    } else {
      console.log(result);
      res.send('user deleted');
    }
  });
});



// debug here
app.get('/', function(req, res){
  res.render('ContactPage');
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