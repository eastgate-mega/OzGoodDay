var express = require('express'),
    router  = express.Router({mergeParams: true}),
    Items   = require('../controllers/itemsController')

//INDEX ROUTES
router.get('/', Items.index_get);

//ITEM ROUTES
router.get('/new', Items.create_item_get);

router.post('/', Items.create_item_post);

router.get('/:id', Items.show_item_get);


module.exports = router;