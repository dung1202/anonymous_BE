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
    quantity: Number,
    description: [{
        conten: String,
        quantity: Number
    }],
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