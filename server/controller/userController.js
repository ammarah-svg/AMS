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



const loginUser = AsyncHandler(async (req, res) => {
    // get the data from the user
    const { email, password, department } = req.body;
    // check if user adds the fields
    if (!email || !password || !department) {
        res.status(400)
        throw new Error('Please enter all the fields');
    }

    // check if email/user exists
const userExists = await User.findOne({ email });
    if (!userExists) {
        res.status(404);
        throw new Error('User not present');
    } else {
        // check if password also matches
        if (await bcrypt.compare(password, userExists.password)) {
            res.send(userExists);
        }
        // check if password is incorrect
        else {
            res.status(401);
            throw new Error('Invalid password')
        }
    }
});



const updateUser = AsyncHandler(async (req, res) => {
    const userId = req.params.id; // Get user ID from route parameters
    const { f_name, l_name, email, password, gender, department } = req.body;
  
    // Validate that the required fields are provided (can be customized)
    if (!f_name || !l_name || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }
  
    // Find the user by ID
    const user = await User.findById(userId);
  
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    // Update the fields that are allowed to be updated
    user.f_name = f_name || user.f_name;
    user.l_name = l_name || user.l_name;
    user.email = email || user.email;
    user.gender = gender || user.gender;
    user.department = department || user.department;
  
    // Check if the password is being updated
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
  
    const updatedUser = await user.save();
  
    // Return the updated user data (without password)
    res.status(200).json({
      _id: updatedUser._id,
      f_name: updatedUser.f_name,
      l_name: updatedUser.l_name,
      email: updatedUser.email,
      gender: updatedUser.gender,
      department: updatedUser.department,
    });



    
  });
  


const viewRecords = AsyncHandler(async (req, res) => {
    const users = await User.find();
    
    if (users.length === 0) {
        res.status(404).json({ message: "No user records found" });
    } else {
        res.status(200).json(users); // Always send JSON with status code
    }
});


module.exports = { registerUser, loginUser, updateUser, viewRecords };