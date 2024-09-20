const express = require('express');
const { register, login } = require('../controllers/auth.js');
const authenticateToken = require('../middleware/authantice.js'); 

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/profile', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
