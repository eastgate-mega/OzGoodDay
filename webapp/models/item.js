var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
    name: String,
    price: Number,
    description: String

})


module.exports = mongoose.model('Item', itemSchema);