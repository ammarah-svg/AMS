const express = require('express');
const { registerUser, loginUser, updateUser, viewRecords, markAttendance } = require('../controller/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.patch('/profile-edit/:id', updateUser);// PATCH is good for partial updates
// router.get('/view-records', viewRecords);

module.exports = router;
