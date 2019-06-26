var express = require('express'),
    router = express.Router({
        mergeParams: true
    }),
    paypal = require('paypal-rest-sdk'),
    Item    = require('../models/item'),
    Cart    = require('../models/cart')


// var totalPrice = '12.00';
// CHART ROUTES
// router.get('/add-to-cart/:id', isLoggedIn, function (req, res) {
//     var itemId = req.params.id;
//     var cart = new Cart(req.session.cart ? req.session.cart : {});
//     Item.findById(itemId, function (err, item) {
//         if (err) {
//             res.redirect('/');
//         } else {
//             cart.add(item, itemId);
//             req.session.cart = cart;
//             // console.log(req.session.cart);

//             res.redirect('/items/' + itemId);
//         }
//     });
// });

// router.get('/cart', function (req, res) {
//     if (!req.session.cart) {
//         res.redirect('/')
//     } else {
//         var cart = new Cart(req.session.cart);
//         //show cart contant
//         console.log(cart);

//         res.render('shop_cart/cart', {
//             items: cart.generateArray(),
//             cart: cart,
//             totalPrice: cart.totalPrice
//         });
//     }
// });



// PAYPAL CONFIG
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AdzxdgxPGJLPCe0tvl9IyYrzp_izNOrahgoJrzdAuFrErUTueDLsD0JbXPJwV9CaGelbin0AMAddNcJm',
    'client_secret': 'EKZKlKYRw6mYQ236iaW5Fkd6RGNTkLesLMJSwekdHMBTIw1amQqqq4X2CLsI2dNpHVOVybS5DDC22IiO'
});

router.post('/pay', (req, res) => {

    var totalPrice = getTotalPrice(req);
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/payment/success",
            "cancel_url": "http://localhost:3000/payment/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "item",
                    "price": "1.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                // "total": '1.00',
                "total": totalPrice
            },
            "description": "This is the payment description."
        }]
    };
    

    
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            payment.links.forEach(function (link) {
                if (link.rel === 'approval_url') {
                    res.redirect(link.href);
                }
            });
            // console.log("Create Payment Response");
            // console.log(JSON.stringify(payment,null,4));
            
        }
    });


});

router.get('/success', function (req, res) {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    var totalPrice = getTotalPrice(req);
    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "AUD",
                "total": totalPrice
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log(JSON.stringify(payment));
            res.send('Success');
        }
    });
});

router.get('/cancel', (req, res) => res.send('Cancelled'));

function getTotalPrice(req) {
    if (!req.session.cart) {
        var totalPrice = 12;
        
    } else {
        var cart = new Cart(req.session.cart);
        //show cart contant
        var totalPrice = cart.totalPrice;
    }
    return totalPrice.toFixed(2).toString();
}

module.exports = router;