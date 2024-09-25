const mongoose = require('mongoose');

// Function to validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

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
        flightId: {
           type: String,
           ref: 'Flight'
        },
        purchaseDate: { type: Date, default: Date.now }
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

const AuthModel = mongoose.models.auth || mongoose.model('auth', AuthSchema);

module.exports = AuthModel;
