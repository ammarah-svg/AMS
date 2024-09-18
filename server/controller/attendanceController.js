const Attendance = require('../models/Attendance');
const User = require('../models/userModel');
const mongoose = require('mongoose'); // Add this
const AsyncHandler = require('express-async-handler');

const markAttendance = AsyncHandler(async (req, res) => {
    const { studentId, date, isPresent } = req.body;

    // Validate student ID
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
        return res.status(400).json({ message: 'Invalid Student ID' });
    }

    const studentObjectId = new mongoose.Types.ObjectId(studentId);

    // Check if attendance is already marked for this student on the same date
    const existingAttendance = await Attendance.findOne({ student: studentObjectId, date });

    if (existingAttendance) {
        return res.status(400).json({ message: 'Attendance already marked for this date' });
    }

    // Create new attendance record
    const attendance = new Attendance({
        student: studentObjectId,
        date,
        isPresent,
    });

    const savedAttendance = await attendance.save();

    // If the student was present, increment the present count for the student
    if (isPresent) {
        const student = await User.findById(studentObjectId);
        student.presentCount = (student.presentCount || 0) + 1;
        await student.save();
    }

    // Return saved attendance
    res.status(201).json(savedAttendance);
});

module.exports = { markAttendance };
