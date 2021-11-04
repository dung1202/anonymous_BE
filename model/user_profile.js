var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    avatar: String,
    address: String,
    phoneNumber: String,
    birthday: String, 
    gender: String,
    created: {
        type: Date,
        default: Date.now
    },
});

var User_Profile = mongoose.model("User_Profile", userSchema);

module.exports = User_Profile;
