const JWT = require('jsonwebtoken');
const AuthSchema = require('../models/auth'); 

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: -1, message: "Token not found. Please log in again." });
    }

    JWT.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            console.error("Token verification error:", err.message); // Log error for debugging
            return res.status(403).json({ success: -1, message: "Invalid token. Please log in again." });
        }

        const currentUser = await AuthSchema.findOne({ _id: decoded.id });

        if (!currentUser) {
            return res.status(401).json({ success: -1, message: "Unauthorized user. Token is not valid." });
        }

        req.user = currentUser; // Attach user to the request
        next();
    });
};


module.exports = authenticateToken;
