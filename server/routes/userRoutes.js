const express = require('express');
const {registerUser, loginUser, updateUser} = require('../controller/userController');

const router = express.Router();


router.post('/register', registerUser)
router.post('/login',loginUser)

router.put('/profile-edit', updateUser)





module.exports = router