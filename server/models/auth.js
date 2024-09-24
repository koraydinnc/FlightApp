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
    tickets: [{
        flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'flightId' },
        purchaseDate: { type: Date, default: new Date() }
    }],
    date: {
        type: Date,
        default: new Date()
    }
});

const AuthModel = mongoose.models.auth || mongoose.model('auth', AuthSchema);

module.exports = AuthModel;
