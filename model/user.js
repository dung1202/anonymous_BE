var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
	name: String,
	email: {
		type: String,
		unique: true,
	},
	password: String,
	createdDate: {
		type: Date,
		default: Date.now,
	},
});

var User = mongoose.model("User", userSchema);

module.exports = User;
