const Item = require('../models/item')

exports.add_product = (req, res) => {
    res.render('item/product/productmanage');
}

exports.find_all_items = (req, res) => {
    Item.find(function(err, items){
        if (err) {
            console.log(err);
            
        } else {
            res.send(items);
        }
    })
}