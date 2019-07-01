var express = require('express'),
    router = express.Router({mergeParams: true}),
    Paypal = require('../controllers/paypalController')

router.post('/pay', Paypal.paypal_pay)

router.get('/success', Paypal.pay_success);

router.get('/cancel', (req, res) => res.send('Cancelled'));

module.exports = router;