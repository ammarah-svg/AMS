const AsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const registerUser = AsyncHandler(async (req, res) => {
    const { f_name, l_name, email, password, gender, dob, department, image } = req.body;

    // Check if all fields are provided
    if (!f_name || !l_name || !email || !password || !dob || !gender || !image || !department) {
        res.status(400);
        throw new Error('Please enter all the fields');
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
            f_name, l_name, email, password: hashedPassword, dob, gender, image, department
        })

        res.status(201).json(createdUser);
    }

    
  
});


const loginUser = AsyncHandler(async (req, res) => {
    // get the data from the user
    const { email, password,department } = req.body;
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

     

// Logout User
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        // sameSite: "none",
        // secure: true,
    });
    res.status(200).json({ message: "User logged out" });
});

       

})

module.exports = { registerUser, loginUser };
