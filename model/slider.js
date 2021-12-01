var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  listphotos: [String],
  createdAt: {
    type: Date,
    default: Date.now(+new Date() + 7 * 60 * 60 * 1000),
  },
  updateAt: {
    type: Date,
    default: Date.now(+new Date() + 7 * 60 * 60 * 1000),
  },
});

var Slider = mongoose.model("Slider", userSchema);

module.exports = Slider;
