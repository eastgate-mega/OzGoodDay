var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

var itemSchema = new Schema({
    product_name: {type: String},
    supply_item_number: {type: String},
    original_price: {type: Number},
    cost_price: {type: Number},
    bar_code: {type: Number},
    category: {type: String},
    quantity: {type: Number},
    // unit of measurement is set to be 'g'
    weight: {type: Number},
    product_description: {type: String},
    // demention: {type: Number},
    brand: {type: String, default: 'None'},
    //need to be changed to enum type in the furture
    color: {type: String, default: 'default'},
    supplier: {type: String, default: 'None'},
    return_status: {type: String}, 
    image_path:{
        type: String, 
        default: 'https://thumbs.dreamstime.com/t/demo-sign-icon-stamp-blue-vector-92101308.jpg'
    },
    create_data: {type: Date, default: Date.now},
    last_modified: {type: Date, default: Date.now},
    sold_amount: {type: Number, default: 0}

});

// itemSchema.plugin(mongoose_fuzzy_searching, {fields: ['product_name', 'product_description']});


module.exports = mongoose.model('Item', itemSchema);