const { Schema, model }  = require('mongoose');

const schema = new Schema({
    title: {type: String, require: true},
    creator: {type: String, require: true},
    creator_id: {type: Schema.Types.ObjectId, ref: 'User'},
    content: {type: String, require: true},
    createdAt: {type: Date, default: new Date(+new Date() + 7*60*60*1000)},
    updatedAt: {type: Date, default: new Date(+new Date() + 7*60*60*1000)}
});

const Model = model('News', schema);

module.exports = Model;