const AuthSchema = require('../Models/auth');
const { fetchSelectedFlight } = require('./fetch');
const mongoose = require('mongoose');

// Ticket Purchase Handler
const ticketBuy = async (req, res) => {
    const { flightId } = req.body;

    // Validate flightId
    if (!mongoose.Types.ObjectId.isValid(flightId)) {
        return res.status(400).json({ message: 'Invalid flight ID' });
    }

    try {
        // Find user by ID
        const user = await AuthSchema.findById(req.user._id); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Push new ticket into user's tickets array
        user.tickets.push({ flightId, purchaseDate: new Date() });
        await user.save(); // Save the updated user document

        res.status(200).json({ message: 'Ticket purchased successfully', tickets: user.tickets });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Get User's Tickets Handler
const getUserTickets = async (req, res) => {
    try {
        // Find user and populate tickets with flight data
        const user = await AuthSchema.findById(req.user._id).populate({
            path: 'tickets.flightId',  // Populate flightId with flight details
            model: 'Flight'            // Ensure you refer to the correct model
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ tickets: user.tickets });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

module.exports = { ticketBuy, getUserTickets };
