const { Schema, model }  = require('mongoose');

const schema = new Schema({
    title: {type: String, require: true},
    creator: {type: String, require: true},
    creator_id: {type: Schema.Types.ObjectId, ref: 'User'},
    content: {type: String, require: true},
    image: {type: String},
    tags: [],
    createdAt: {type: Date, default: new Date(+new Date() + 5*60*60*1000)},
    updatedAt: {type: Date, default: new Date(+new Date() + 5*60*60*1000)}
});

const Model = model('News', schema);

module.exports = Model;