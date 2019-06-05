var express = require('express'),
    router  = express.Router({mergeParams: true}),
    Item    = require('../models/item')

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
  
  //ITEM ROUTES
  //show create item page
  router.get('/new', function(req, res){
    res.render('item/new');
  });
  
  //create item logic
  router.post('/', function(req, res){
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

module.exports = router;