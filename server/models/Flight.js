const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
    flightNumber: {
        type: String,
        required: true,
    },
    departure: {
        type: String,
        required: true,
    },
    arrival: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    
});

const FlightModel = mongoose.models.Flight || mongoose.model('Flight', FlightSchema);

module.exports = FlightModel;
