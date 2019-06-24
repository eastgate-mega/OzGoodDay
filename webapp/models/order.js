const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    cart: {
        type: Object,
        required: true,
        
    }
});