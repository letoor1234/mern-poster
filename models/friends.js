const mongoose = require('mongoose');
const {Schema} = mongoose;


const friendsSchema = new Schema({
    userId: {type: String, required: true},
    friends: {type: Object, required: true}
});

module.exports = mongoose.model('Friend', friendsSchema);