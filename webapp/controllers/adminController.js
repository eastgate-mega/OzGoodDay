'use strict';

const User = require('../models/user'),
passport = require('passport'),
Address = require('../models/postAddress')

class Admin{
    constructor(){

    }

    async customer_profile_get(req, res) {
        res.render('login/user_profile');
        return
    }

    async customer_login_get(req, res) {
        res.render("login/login");
        return
    }

    async customer_register_get(req, res) {
        res.render('login/register');
    }

    async customer_register_post(req, res) {
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

    async customer_login_get(req, res) {
        res.render("login/login");
    }

    async customer_login_post(req, res) {
        passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/login"
            })
    }

    async customer_logout(req, res) {
        req.logout();
        res.redirect("/");
    }

    async customer_address_get(req, res) {
        Address.find(function(err, address){
            if (err) {
                console.log(err);
                
            } else {
                res.send(address);
            }
        })
    }

    async customer_address_post(req, res) {
        res.send('address has been create');
    }

    async customer_address_put(req, res) {
        res.send('address has been update');
    }
}

module.exports = new Admin();