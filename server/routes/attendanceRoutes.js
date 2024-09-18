const express = require('express');
const { markAttendance } = require('../controller/attendanceController');
const router = express.Router();

router.post('/mark-attendance', markAttendance);
// router.get('/view-attendance', viewAttendance);




module.exports = router;
