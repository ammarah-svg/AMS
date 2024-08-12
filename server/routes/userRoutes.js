const express = require('express');
const { registerUser, loginUser, updateUser } = require('../controller/userController');
const { protect } = require('../handlers/auth');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.patch('/profile-edit', protect, updateUser);


module.exports = router;