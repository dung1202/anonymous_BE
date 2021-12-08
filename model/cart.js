const { Schema, model } = require("mongoose");

const cart = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', require: true},
    items: [{
        product_id: {type: Schema.Types.ObjectId, ref: 'product'},
        quantity: {type: Number, default: 0},
    }],
});
const Cart_Model = model('Cart', cart);

const invoice = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', require: true},
    isPay: {type: Boolean, default: false},
    isDelivery: {type: Boolean, default: false},
    order_items: {type: Array, require: true},
    createdAt: {type: Date, default: new Date(+new Date() + 5*60*60*1000)},
    payAt: {type: Date}
})
const Invoice_Model = model('Invoice', invoice);

module.exports = { Cart_Model, Invoice_Model };