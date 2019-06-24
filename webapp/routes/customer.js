const express = require('express'),
router  = express.Router({mergeParams:true}),
User    = require('../models/user'),
passport = require('passport')




router.get("/secret",isLoggedIn, function(req, res){

    res.render("login/secret");
    });

router.get('/:id/profile', isLoggedIn, function(req, res){
    res.render('login/user_profile');
});

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
        res.redirect("/");
    });
});
});

//login logic
//middleware
router.post("/login", passport.authenticate("local", {
successRedirect: "/",
failureRedirect: "/login"
}) ,function(req, res){
});

router.get("/logout", function(req, res){
req.logout();
res.redirect("/");
});



function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;