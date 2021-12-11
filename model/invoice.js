const invoice = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', require: true},
    isPay: {type: Boolean, default: false},
    isDelivery: {type: Boolean, default: false},
    order_items: {type: Array, require: true},
    createdAt: {type: Date, default: new Date(+new Date() + 5*60*60*1000)},
    payAt: {type: Date}
})

module.exports = model('Invoice', invoice);