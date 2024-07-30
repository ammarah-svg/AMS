const AsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registration handler
const registerUser = AsyncHandler(async (req, res) => {
    const { f_name, l_name, email, password, gender, image, department, role } = req.body;

    // Check if all required fields are provided
    if (!f_name || !l_name || !email || !password || !gender) {
        res.status(400);
        throw new Error('Please enter all the required fields');
    }

    if (password.length < 6) {
        res.status(400);
        throw new Error("Password must be at least 6 characters");
    }

    // Check if the user already exists
    const isUserPresent = await User.findOne({ email });

    if (isUserPresent) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const createdUser = await User.create({
        f_name,
        l_name,
        email,
        password: hashedPassword,
        gender,
        image: image || null,
        department: department || null,
        role: role || 'user'
    });

    res.status(201).json(createdUser);
});

// Login handler
const loginUser = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            f_name: user.f_name,
            l_name: user.l_name,
            email: user.email,
            gender: user.gender,
            image: user.image,
            department: user.department,
            role: user.role,
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '10d',
    });
};

module.exports = { registerUser, loginUser };
