const AuthSchema = require('../Models/auth');
const mongoose = require('mongoose');



const ticketBuy = async (req, res) => {
    const { flightId, userId } = req.body;

    try {
        const user = await AuthSchema.findById(userId); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.tickets.push({ flightId, purchaseDate: new Date() });
        await user.save();

        res.status(200).json({ message: 'Ticket purchased successfully', tickets: user.tickets });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};


const getUserTickets = async (req, res) => {
    const {userId} = req.body
    console.log(userId)
    try {
        const user = await AuthSchema.findById(userId).populate({
            path: 'tickets',  
            model: 'Flight'  
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
