var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    content: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

// Use 'ref' to connect a certain field value with another collection.

module.exports = mongoose.model('Message', schema); // messages in MongoDB, small case plural
