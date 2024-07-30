const AsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const registerUser = AsyncHandler(async (req, res) => {
    const { f_name, l_name, email, password, gender,  image, department, role } = req.body;

    // Check if all fields are provided
    if (!f_name || !l_name || !email || !password || !gender || !image || !department || !role ) {
        res.status(400);
        throw new Error('Please enter all the fields');
    }   if(password.length < 6) {
        res.status(400);
        throw new Error("Password must be at least 6 characters");
    }

    // Check if the user already exists
    const isUserPresent = await User.findOne({ email })
    // if user is present, throw an error
    if (isUserPresent) {
        res.status(400);
        throw new Error('User already exists')
    } else {

        // generate salt/gibberish
        const salt = await bcrypt.genSalt(10);
        // hash the password
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword)

        const createdUser = await User.create({
            f_name, l_name, email, password: hashedPassword, gender, image, department, role
        })

        res.status(201).json(createdUser);
    }

    
  
});


module.exports = { registerUser };

