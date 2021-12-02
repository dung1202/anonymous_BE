const { Schema, model } = require("mongoose");

const cart = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', require: true},
    items: [{
        product_id: {type: Schema.Types.ObjectId, ref: 'product'},
        quantity: {type: Number, default: 0},
    }],
});

module.exports = model('Cart', cart);
