var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    listedPrice: Number,
    discountPrice: Number,
    is_hot: Boolean,
    in_slider: Boolean,
    listphotos: [{
        type: String
    }],
    // lisphotos[0] la avatar
    quantity: {
        type: Number,
        max: 5,
        min: 0
    },
    description: {
        content: String,
        quantity: {
            type: Number,
            max: 5,
            min: 0
        },
    tags: [{
        type: String
    }],
    supplier: String,
    createdAt:
    {
        type: Date,
        default: Date.now()
    }
});

var Product = mongoose.model("Product", userSchema);

module.exports = Product;
