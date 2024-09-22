const express = require('express');
const { register, login } = require('../controllers/auth.js');
const { fetchFlightsToday,fetchFlightsWithDate,fetchFlightsTomorrow } = require('../controllers/fetch.js');
const authenticateToken = require('../middleware/authantice.js'); 

const router = express.Router();

//auth
router.post('/register', register);
router.post('/login', login);

//fetch
router.post('/fetchFlightsToday', fetchFlightsToday);
router.post('/fetchFlightsWithDate', fetchFlightsWithDate);
router.post('/fetchFlightsTomorrow', fetchFlightsTomorrow)


router.get('/profile', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
