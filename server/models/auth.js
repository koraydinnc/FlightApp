const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {  
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('auth', AuthSchema);
