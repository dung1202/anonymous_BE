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
    quantity: {
        type: Number,
        min: 0,
        max: 0
    },
    description: [{
        content: String,
        quantity: {
            type: Number,
            min: 0,
            max: 0
        }
    }],
    tags: [{
        type: String
    }],
    supplier: String,
    createdAt:
    {
        type: Date,
        default: Date.now(+new Date() + 7 * 60 * 60 * 1000)
    },
    updateAt:
    {
        type: Date,
        default: Date.now(+new Date() + 7 * 60 * 60 * 1000)
    }
});

var Product = mongoose.model("Product", userSchema);

module.exports = Product;
