var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  listedPrice: Number,
  discountPrice: Number,
  is_hot: Boolean,
  in_slider: Boolean,
  img: String,
  listphotos: [String],
  quantity: Number,
  sold: Number,
  description: String,
  vote: Number,
  tags: [String],
  supplier: String,
  createdAt: {
    type: Date,
    default: Date.now(+new Date() + 7 * 60 * 60 * 1000),
  },
  updateAt: {
    type: Date,
    default: Date.now(+new Date() + 7 * 60 * 60 * 1000),
  },
});

var Product = mongoose.model("Product", userSchema);

module.exports = Product;
