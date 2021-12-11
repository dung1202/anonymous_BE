const { Schema, model } = require("mongoose");

const invoice = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', require: true},
    deliveryAddress: {type: String, require: true},
    note: {type: String, default: ''},
    order_items: {type: Array, require: true},
    isDelivery: {type: Boolean, default: false},
    createdAt: {type: Date, default: new Date(+new Date() + 5*60*60*1000)},
    payAt: {type: Date}
})

module.exports = model('Invoice', invoice);