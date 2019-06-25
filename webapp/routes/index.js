var express = require('express'),
router  = express.Router({mergeParams: true})

router.get('/', function(req, res){
    res.redirect('/items');
});
  
router.get('/contact', function(req, res){
    res.render('contact')
});

router.get('/sendDetail', function(req, res){
    res.render('sendDetail')
});



module.exports = router;