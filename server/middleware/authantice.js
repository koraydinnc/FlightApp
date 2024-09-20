const JWT = require('jsonwebtoken');
const Auth = require('../models/auth'); // Change to match your Auth model filename

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({
            success: -1,
            data: [],
            message: "Please log in again"
        });
    }

    const currentUser = await Auth.findOne({ accessToken: token });

    if (currentUser) {
        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(401).json({
                    success: -1,
                    data: [],
                    message: "Please log in again"
                });
            }

            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({
            success: -1,
            data: [],
            message: "Please log in again"
        });
    }
}

module.exports = authenticateToken;
