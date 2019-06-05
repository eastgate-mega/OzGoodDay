var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
    product_name: {type: String, isRequired: true},
    supply_item_number: {type: String, isRequired:true},
    category: {type: String, isRequired: true},
    barCode: {type: Number, isRequired: true, default: 0},
    image_path:[
        {
            type: String,
            isRequired: false,
            default: 'https://thumbs.dreamstime.com/t/demo-sign-icon-stamp-blue-vector-92101308.jpg'
        }
    ],
    create_data: {type: Date, default: Date.now},
    last_modified: {type: Date, default: Date.now},
    brand: {type: String, default: 'None'},
    cost: {type: Number, isRequired: true},
    original_price: {type: Number, isRequired: true},
    quantity: {type: Number, isRequired: true},
    //need to be changed to enum type in the furture
    color: {type: String, default: 'black'},
    sold_amount: {type: Number, default: 0},
    // unit of measurement is set to be 'g'
    weight: {type: Number, default: 1000},
    return_status: {type: Boolean, default: false}


});


module.exports = mongoose.model('Item', itemSchema);