const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming User model exists for student
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    isPresent: {
        type: Boolean,
        required: true
    },
}, { timestamps: true }); // This will add createdAt and updatedAt fields

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
