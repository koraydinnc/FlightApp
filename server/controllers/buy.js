const AuthSchema = require('../Models/auth');
const { fetchSelectedFlight } = require('./fetch');

const ticketBuy = async (req, res) => {
    const { flightId } = req.body;

    try {
        const user = await AuthSchema.findById(req.user._id); 

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.tickets.push({ flightId });

        await user.save();
        res.status(200).json({ message: 'Ticket purchased successfully', tickets: user.tickets });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

const getUserTickets = async (req, res) => {
    try {
        const user = await AuthSchema.findById(req.user._id); 

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const flightInfoPromises = user.tickets.map(async (ticket) => {
            const flightInfo = await fetchSelectedFlight({ id: ticket.flightId });
            return { flightId: ticket.flightId, flightInfo, purchaseDate: ticket.purchaseDate };
        });

        const ticketsWithFlightInfo = await Promise.all(flightInfoPromises);

        res.status(200).json({ tickets: ticketsWithFlightInfo });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};


module.exports = {ticketBuy,getUserTickets}