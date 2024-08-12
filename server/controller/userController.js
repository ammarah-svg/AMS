const AsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');


const registerUser = AsyncHandler(async (req, res) => {
    const { f_name, l_name, email, password, gender, image, department } = req.body;

    if (!f_name || !l_name || !email || !password || !gender || !department) {
        res.status(400);
        return res.json({ message: 'Please enter all required fields' });
    }

    if (password.length < 6) {
        res.status(400);
        return res.json({ message: 'Password must be at least 6 characters' });
    }


    const isUserPresent = await User.findOne({ email });
    if (isUserPresent) {
        res.status(400);
        return res.json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await User.create({
        f_name, l_name, email, password: hashedPassword, gender, image: image || null, department
    });

    res.status(201).json(createdUser);
});


const asyncHandler = require('express-async-handler');



const loginUser = AsyncHandler(async (req, res) => {
    const { email, password, department } = req.body;

    if (!email || !password || !department) {
        return res.status(400).json({ message: 'Please enter all required fields' });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    if (await bcrypt.compare(password, user.password)) {
        // Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } 
        );

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true, 
            
            sameSite: 'None', 
            maxAge: 3600000 
        });

       
        res.status(200).json({ message: 'Login successful', user });
    } else {
        res.status(401).json({ message: 'Invalid password' });
    }
});





const updateUser = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        const { f_name, l_name, email, password, gender, department } = req.body;
        user.f_name = f_name || user.f_name;
        user.l_name = l_name || user.l_name;
        user.email = email || user.email;
        user.gender = gender || user.gender;
        user.department = department || user.department;

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});





module.exports = { registerUser, loginUser, updateUser };