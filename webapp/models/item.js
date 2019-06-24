var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
    product_name: {type: String},
    supply_item_number: {type: String},
    original_price: {type: Number}, //需要分类
    cost_price: {type: Number}, 
    bar_code: {type: Number},
    category: {type: String}, //需要分类
    quantity: {type: Number},
    // unit of measurement is set to be 'g'
    weight: {type: Number},
    product_description: {type: String},
    // demention: {type: Number},
    brand: {type: String, default: 'None'}, //需要分类
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
    sold_amount: {type: Number, default: 0} //需要分类

});

module.exports = mongoose.model('Item', itemSchema);