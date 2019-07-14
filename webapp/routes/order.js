var express = require('express'),
    router = express.Router({mergeParams: true}),
    Paypal = require('../controllers/paypalController')

router.get('/orders', Paypal.get_all_orders);

module.exports = router;