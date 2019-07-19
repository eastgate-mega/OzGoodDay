var express = require('express'),
    router  = express.Router({mergeParams: true}),
    Manage  = require('../controllers/manageController'),
    Check   = require('../controllers/check')


router.get('/product', Check.isAdmin, Manage.add_product);
router.get('/items',  Manage.find_all_items);
router.get('/ordermanage', Check.isAdmin, Manage.orderlist);
module.exports = router;