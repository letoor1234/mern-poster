const mongoose = require('mongoose');
const {Schema} = mongoose;

const tasksSchema = new Schema({
    userId: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    creation: {type: Date, required: true},
});

module.exports = mongoose.model('Task', tasksSchema);