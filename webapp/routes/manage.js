var express = require('express'),
    router  = express.Router({mergeParams: true}),
    Manage  = require('../controllers/manageController')


router.get('/product', Manage.add_product);
router.get('/items', Manage.find_all_items);
module.exports = router;