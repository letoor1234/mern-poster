const mongoose = require('mongoose');
const {Schema} = mongoose;

const postsSchema = new Schema({
    userId: {type: String, required: true},
    content: {type: String, required: true},
    creation: {type: String, required: true},
});

module.exports = mongoose.model('Post', postsSchema);