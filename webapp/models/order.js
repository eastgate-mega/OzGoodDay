const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var orderSchema = new Schema({
    payer: {
        payment_method: String,
        status: String,
        payer_info:{
            email: String,
            first_name: String,
            last_name: String,
            payer_id: String,
            shipping_address: Object,
            country_code: String
        }
    },
    transactions: [
        {
            amount: [Object],
            payee: [Object],
            description: String,
            item_list: [Object],
            related_resources: [Array]
          }
    ]
});

module.exports = mongoose.model('Order', orderSchema);