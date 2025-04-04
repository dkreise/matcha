const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    console.log('Auth Header:', authHeader); // Bearer <token>, thats why split:
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                console.error('Token verification error:', err);
                return res.sendStatus(403); // Forbidden
            }
            req.user = decoded.username;
            next();
        }
    );
};

module.exports = verifyJWT;
