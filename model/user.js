var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
	username: String,
	hash: String,
	salt: {
		type: Number,
		default: 10
	},
	role: {
		type: String,
		default: 'user'
	},
	photoUrl: {
		type: String,
		default: `https://firebasestorage.googleapis.com/v0/b/anonymous-b685e.appspot.com/o/${encodeURIComponent('acc_clone.png')}?alt=media`
	},
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
	dob: Date,
	createdDate: {
		type: Date,
		default: Date.now,
	},
});

var User = mongoose.model("User", userSchema);

module.exports = User;
