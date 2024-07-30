const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    f_name: {
        type: String,
        required: [true, 'Please enter name']
    },
    l_name: {
        type: String,
        required: [true, 'Please enter last name']
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter password']
    },
    gender: {
        type: String,
        required: [true, 'Please enter gender']
    },
    image: {
        type: String,
        default: null
    },
    department: {
        type: String,
        default: null
    },
    role: {
        type: String,
        default: 'user',
        enum: ['admin', 'user']
    },
}, {
    timestamps: true
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);
