var express = require('express'),
router  = express.Router({mergeParams: true})

router.get('/', function(req, res){
    res.redirect('/items');
});
  
router.get('/contact', function(req, res){
    res.render('contact')
});


module.exports = router;