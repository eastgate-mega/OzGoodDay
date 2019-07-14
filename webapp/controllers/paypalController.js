const Cart = require('../models/cart'),
paypal = require('paypal-rest-sdk'),
Order = require('../models/order')

// PAYPAL CONFIG
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AdzxdgxPGJLPCe0tvl9IyYrzp_izNOrahgoJrzdAuFrErUTueDLsD0JbXPJwV9CaGelbin0AMAddNcJm',
    'client_secret': 'EKZKlKYRw6mYQ236iaW5Fkd6RGNTkLesLMJSwekdHMBTIw1amQqqq4X2CLsI2dNpHVOVybS5DDC22IiO'
});

exports.paypal_pay = (req, res) => {
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
            "amount": {
                "currency": "USD",
                "total": cart.totalPrice.toString()
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
        }
    });
}

exports.pay_success = (req, res) => {
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
            throw error;
        } else {
            saveOrder(payment);        
            res.send('Success');
        }
    });
}

exports.get_all_orders = (req, res) =>{
    Order.find(function(err, orders){
        res.send(orders);
    })
}

function saveOrder(payment){
    Order.create(payment, function(err, item){
        if (err) {
            console.log(err);
            
        } else {
            return
        }
    })
}

function getCart(req) {
    if (!req.session.cart) {
        return null;
    } else {
        var cart = new Cart(req.session.cart);
    }
    return cart; 
}