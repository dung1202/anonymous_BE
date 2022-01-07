const { Schema, model }  = require('mongoose');

const schema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User', require: true},
    emails: [{type: String, require: true}],
    content: {type: String, require: true},
    sentAt:  {type: Date, default: new Date(+new Date() + 5*60*60*1000)},
});

module.exports = model('NewsLetter', schema);
