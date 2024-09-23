const express = require('express');
const { register, login } = require('../controllers/auth.js');
const { fetchFlightsToday,fetchFlightsTomorrow,fetchFlightWithDate, fetchSelectedFlight } = require('../controllers/fetch.js');
const authenticateToken = require('../middleware/authantice.js'); 
const { ticketBuy, getUserTickets } = require('../controllers/buy.js');

const router = express.Router();

//auth
router.post('/register', register);
router.post('/login', login);

//fetch
router.get('/fetchFlightsToday', fetchFlightsToday);
router.get('/fetchFlightsTomorrow', fetchFlightsTomorrow)
router.get('/fetchFlightWithDate', fetchFlightWithDate)
router.get('^/fetchSelectedFlight', fetchSelectedFlight)

//buy
router.post('/ticketBuy', authenticateToken, ticketBuy)
router.get('/getUserTickets/:userId', authenticateToken,getUserTickets)


router.get('/profile', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
