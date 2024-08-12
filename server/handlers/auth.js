const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); 

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token; 
        
        if (!token) {
            return res.status(401).json({ message: 'Not authorized, Please login' });
        }

        // Verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        // Get user from token
        const user = await User.findById(verified.id).select('-password');
        
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, Please login' });
    }
};

module.exports = { protect };