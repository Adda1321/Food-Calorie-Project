const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    Username: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Token: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Users = mongoose.model('Users', userSchema);

module.exports = Users;