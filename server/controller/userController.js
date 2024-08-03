const AsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt'); 



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
    } });

        //  update user

        const updateUser = AsyncHandler(async (req, res) => {
            const user = await User.findById(req.user.id);
            if (user) {
              const { f_name, l_name, email, password, gender, department } = req.body;
          
              if (password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
              }
          
              user.f_name = f_name || user.f_name;
              user.l_name = l_name || user.l_name;
              user.email = email || user.email;
              user.password=password || user.password;
              user.gender = gender || user.gender;
              user.department = department || user.department;
          
              const updatedUser = await user.save();
              res.status(200).json(updatedUser);
            } else {
              res.status(404);
              throw new Error('User not found');
            }
          } );
          
         
    

module.exports = { registerUser,loginUser, updateUser };
