const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    UserID: {
       
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    }, 
    Token: {
        type: String,
        required: true,
    },
     
    Food: {
        type: String,
        required: true,
    },
     
    Calorie: {
        type: Number,
        required: true,
    },

}, { timestamps: true });

const Foods = mongoose.model('Food', foodSchema);

module.exports = Foods;