var express = require('express'),
    router  = express.Router({mergeParams:true}),
    User    = require('../models/user'),
    passport = require('passport')

// ==============
// AUTH ROUTE 
// ==============
// show register form
router.get('/register', function(req, res){
    res.render('login/register');
  });
  
// show login form
router.get("/login", function(req, res){
res.render("login/login"); 
});

//handling user sign up
router.post("/register", function(req, res){
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
router.post("/login", passport.authenticate("local", {
successRedirect: "/secret",
failureRedirect: "/login"
}) ,function(req, res){
});

router.get("/logout", function(req, res){
req.logout();
res.redirect("/");
});

// secret page for user only
router.get("/secret",isLoggedIn, function(req, res){

res.render("login/secret");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
  }

module.exports = router;