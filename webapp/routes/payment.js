var express = require('express'),
    router = express.Router({
        mergeParams: true
    }),
    paypal = require('paypal-rest-sdk'),
    Cart    = require('../models/cart')



// PAYPAL CONFIG
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AdzxdgxPGJLPCe0tvl9IyYrzp_izNOrahgoJrzdAuFrErUTueDLsD0JbXPJwV9CaGelbin0AMAddNcJm',
    'client_secret': 'EKZKlKYRw6mYQ236iaW5Fkd6RGNTkLesLMJSwekdHMBTIw1amQqqq4X2CLsI2dNpHVOVybS5DDC22IiO'
});

router.post('/pay', (req, res) => {

    const cart = getCart(req);
    const items = cart.generateArray();
    var item_array = [];
    items.forEach(function(item){       
        item_array.push({
            
            'name': item.item.product_name,
            'price': item.item.original_price,
            'quantity': item.qty,
            "currency": "USD",
            'description': item.item.product_description
        });
    });

    
    
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
            'item_list':{
                'items': item_array
            },
            // "item_list": {
            //     "items": [{
            //         "name": "item",
            //         "sku": "item",
            //         "price": "1.00",
            //         "currency": "USD",
            //         "quantity": 1
            //     }]
            // },
            "amount": {
                "currency": "USD",

                "total": cart.totalPrice.toString()
                // "total": '25'

            },
            "description": "This is the payment description."
        }]
    };
    

    
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            
            throw error;
        } else {
            // console.log("Create Payment Response");
            // console.log(JSON.stringify(payment,null,4));

            payment.links.forEach(function (link) {
                if (link.rel === 'approval_url') {
                    res.redirect(link.href);
                }
            });

            
        }
    });


});

router.get('/success', function (req, res) {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    let cart = getCart(req);
    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": cart.totalPrice.toString()
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            // console.log(error.response);
            throw error;
        } else {
            // console.log(JSON.stringify(payment));
            res.send('Success');
        }
    });
});

router.get('/cancel', (req, res) => res.send('Cancelled'));

function getCart(req) {
    if (!req.session.cart) {
        return null;
    } else {
        var cart = new Cart(req.session.cart);
        //show cart contant
    }
    return cart; 
}

module.exports = router;