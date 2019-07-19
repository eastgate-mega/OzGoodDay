const express = require('express'),
router = express.Router({mergeParams: true}),
passport = require('passport'),
Admin = require('../controllers/adminController'),
Check = require('../controllers/check')

// router.get('/:id/profile', isLoggedIn, Admin.customer_profile_get);
router.get('/:id/profile', Check.isLoggedIn, Admin.customer_profile_get);
router.get('/register', Admin.customer_register_get);
router.post("/register", Admin.customer_register_post);
router.get("/login", Admin.customer_login_get);
router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}));
router.get("/logout", Admin.customer_logout);

//user address detail API
router.get('/address', Admin.customer_address_get);
router.post('/address', Admin.customer_address_post);
router.put('/address', Admin.customer_address_put);

module.exports = router;