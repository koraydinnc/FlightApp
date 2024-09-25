const express = require('express');
const { register, login } = require('../controllers/auth.js');
const { fetchFlightsToday, fetchFlightsTomorrow, fetchFlightWithDate, fetchSelectedFlight } = require('../controllers/fetch.js');
const authenticateToken = require('../middleware/authantice.js'); 
const { ticketBuy, getUserTickets } = require('../controllers/buy.js');

const router = express.Router();

// Authentication routes
router.post('/register', register);
router.post('/login', login);

// Flight fetching routes
router.get('/fetchFlightsToday', fetchFlightsToday);
router.get('/fetchFlightsTomorrow', fetchFlightsTomorrow);
router.get('/fetchFlightWithDate', fetchFlightWithDate);
router.get('/fetchSelectedFlight', fetchSelectedFlight); // Corrected this route

// Ticket purchase routes
router.post('/ticketBuy', authenticateToken, ticketBuy);
router.post('/getUserTickets', authenticateToken, getUserTickets); // Ensured it uses params

// Protected profile route
router.get('/profile', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
