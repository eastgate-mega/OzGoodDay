var express = require('express'),
    router  = express.Router({mergeParams: true}),
    Items   = require('../controllers/itemsController')

router.get('/add-to-cart/:id', isLoggedIn, Items.add_to_cart);

router.get('/cart', Items.cart_get);

router.get('/getCart', Items.cart_get_API);


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
  }

module.exports = router