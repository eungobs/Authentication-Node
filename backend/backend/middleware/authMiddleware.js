// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware function
const authMiddleware = (req, res, next) => {
    // Get token from request headers
    const token = req.headers['authorization'];

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied.' });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token is not valid.' });
        }
        
        // If the token is valid, save the decoded user information in request for use in other routes
        req.user = decoded;
        next(); // Pass control to the next middleware or route handler
    });
};

module.exports = authMiddleware;
