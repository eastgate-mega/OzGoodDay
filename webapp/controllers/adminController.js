const User = require('../models/user'),
passport = require('passport')

exports.customer_profile_get = (req, res) => {
    res.render('login/user_profile');
}

exports.customer_register_get = (req, res) => {
    res.render('login/register');
}

exports.customer_register_post = (req, res) => {
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
}

exports.customer_login_get = (req, res) => {
  res.render("login/login");
}

exports.customer_logout = (req, res) => {
  req.logout();
  res.redirect("/");
}

exports.customer_login_post = (req, res) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
    })
}
