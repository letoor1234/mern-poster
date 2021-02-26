const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt= require('bcrypt');

const usersSchema = new Schema({
    user: {type: String, required: true},
    mail: {type: String, required: true},
    pass: {type: String, required: true}
});

usersSchema.methods.hashPassword=(pass) =>{
    return bcrypt.hashSync(pass, 12);
};

module.exports = mongoose.model('User', usersSchema);