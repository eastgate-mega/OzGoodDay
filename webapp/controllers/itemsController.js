const Item = require('../models/item'),
Cart    = require('../models/cart')

exports.index_get = (req, res) => {
    var noMatch;
    if (req.query.search) {
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      Item.find({product_name: regex}, function(err, foundItems){
        if (err) {
          console.log(err);
  
        } else {
          if (foundItems.length < 1) {
            noMatch = 'no products match, please try again!!!'
          }
          res.render('item/index', {items: foundItems, noMatch: noMatch});
        }
      })
    } else {
      //get all items form DB
      Item.find({}, function(err, items){
        if (err) {
          console.log(err);
          
        } else {
          res.render('item/index', {items: items, noMatch: noMatch});
        }
      });
    }
}

exports.add_to_cart = (req, res) => {
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
}

exports.cart_get = (req, res) => {
    if (!req.session.cart) {
        res.redirect('/')
      } else {
        var cart = new Cart(req.session.cart);
        //show cart contant
        console.log(cart);
        
        res.render('shop_cart/cart');
      }
}

exports.cart_get_API = (req, res) => {
    if (!req.session.cart) {
        res.redirect('/')
      } else {
        var cart = new Cart(req.session.cart);
        //show cart contant
        console.log(cart);
        
        
        res.send(cart.generateArray());
      }
}

exports.create_item_get = (req, res) => {
    res.render('item/new');
}

exports.create_item_post = (req, res) => {
    Item.create(req.body.item, function(err, item){
        if (err) {
          console.log(err);
          
        } else {
          res.redirect('/items');
        }
      })
}

exports.show_item_get = (req, res) => {
    Item.findById(req.params.id, function(err, item){
        if (err) {
          console.log(err);
          
        } else {
          res.render('item/show', {item: item});
        }
      });
}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };