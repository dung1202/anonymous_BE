const { Schema, model } = require("mongoose");

const invoice = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User', require: true},
    products: [{
        _id: {type: Schema.Types.ObjectId, require: true},
        listPrice: {type: Number, require: true},
        discountPrice: {type: Number, require: true},
        quantity: {type: Number, require: true}
    }],
    totalListPrice: {type: Number, require: true},
    totalDiscountPrice: {type: Number, require: true},
    paymentMethod: {type: String, require: true, enum: ['COD', 'PAYPAL', 'STRIPE']},
    paymentStatus: {type: String, enum: ['pending', 'done'], default: 'pending'},
    status: {type: String, enum: ['pending', 'in_progress', 'delivering', 'delivered', 'failed'], default: 'pending'},
    deliveryAddress: {type: String, require: true},
    note: {type: String, default: ''},
    createdAt: {type: Date, default: new Date(+new Date() + 5*60*60*1000)},
    logs: [{
        user_id: {type: Schema.Types.ObjectId, ref: 'User', require: true},
        changeAction: [],
        updatedAt: {type: Date, required: true}
    }]
})

module.exports = model('Invoice', invoice);