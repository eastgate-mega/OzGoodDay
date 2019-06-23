var express = require('express'),
    router  = express.Router({mergeParams: true}),
    Item    = require('../models/item'),
    Cart    = require('../models/cart')

//INDEX ROUTES
router.get('/', function(req, res){
    Item.find({}, function(err, items){
      if (err) {
        console.log(err);
        
      } else {
        res.render('item/index', {items: items});
      }
    });
});

// CHART ROUTES
router.get('/add-to-cart/:id', isLoggedIn, function(req, res){
  var itemId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  Item.findById(itemId, function(err, item){
    if (err) {
      res.redirect('/');
    } else {
      cart.add(item, itemId);
      req.session.cart = cart;
      // console.log(req.session.cart);
      
      res.redirect('/items/'+ itemId);
    }
  });
});

router.get('/cart', function(req, res){
  if (!req.session.cart) {
    res.redirect('/')
  } else {
    var cart = new Cart(req.session.cart);
    //show cart contant
    console.log(cart);
    
    res.render('shop_cart/cart', {items: cart.generateArray(), cart: cart, totalPrice: cart.totalPrice});
  }
});

//try to write API
router.get('/getCart', function(req, res){
  if (!req.session.cart) {
    res.redirect('/')
  } else {
    var cart = new Cart(req.session.cart);
    //show cart contant
    console.log(cart);
    
    
    res.send({items: cart.generateArray()});
  }
});
  
//ITEM ROUTES
//show create item page
router.get('/new', function(req, res){
  res.render('item/new');
});

//create item logic
router.post('/', function(req, res){
  // console.log(req.body.item);
  
  Item.create(req.body.item, function(err, item){
    if (err) {
      console.log(err);
      
    } else {
      res.redirect('/items');
    }
  })
});

//show item
router.get('/:id', function(req, res){
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

module.exports = router;