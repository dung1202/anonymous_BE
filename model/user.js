var { Schema, model } = require("mongoose");

const schema = new Schema({
    username: {type: String, required: true, unique: true, lowercase: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    hash: {type: String, required: true},
    salt: {type: String, required: true},
    role: {type: String, default: 'user'},
    phone: {type: String, default: ''},
    photoUrl: {type: String, default: `https://firebasestorage.googleapis.com/v0/b/anonymous-b685e.appspot.com/o/${encodeURIComponent('acc_clone.png')}?alt=media`},
    displayName: {type: String, default: ''},
    gender: {type: String, default: ''},
    dob: {type: Date, default: new Date(+new Date() + 5*60*60*1000)},
    address: {
        city: {type: String, default: ''},
        district: {type: String, default: ''},
        ward: {type: String, default: ''},
        detail: {type: String, default: ''},
    },
    createdAt: {type: Date, default: new Date(+new Date() + 5*60*60*1000)}
});

module.exports = model('User', schema);
