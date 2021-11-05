var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
	username: String,
	hash: String,
	salt: process.env.SECRET_KEY,
	role: 'user' || 'admin',
	photoUrl: String,
	displayName: String,
	gender: String,
	email: String,
	phone: String,
	address: {
		city: String,
		district: String,
		wards: String,
		detail: String,
	},
	createdDate: {
		type: Date,
		default: Date.now,
	},
});

var User = mongoose.model("User", userSchema);

module.exports = User;
