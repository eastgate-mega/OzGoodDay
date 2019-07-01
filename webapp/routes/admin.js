const express = require('express'),
router = express.Router({mergeParams: true}),
passport = require('passport'),
Admin = require('../controllers/adminController')

router.get('/:id/profile', isLoggedIn, Admin.customer_profile_get);

router.get('/register', Admin.customer_register_get);

router.post("/register", Admin.customer_register_post);

router.get("/login", Admin.customer_login_get);

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}));


router.get("/logout", Admin.customer_logout);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;