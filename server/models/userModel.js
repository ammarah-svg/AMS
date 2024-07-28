const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    f_name: {
        type: String,
        required: [true, 'please enter name']
    },
    l_name: {
        type: String,
        required: [true, 'please enter last name']
    },
    email: {
        type: String,
        required: [true, 'please enter email']
    },
    password: {
        type: String,
        required: [true, 'please enter password']
    },

    gender: {
        type: String,
        required: [true, 'please enter gender']
    },
    image: {
        type: String,
        required: false,
        default: null
    },
    
  department: {
    type: String,
    required: false,
    default: null

  },
   role:{type: String,
     default: 'user', 
     enum: ['admin', 'user']},
   
    active: {
        type: Boolean,
        default: 0,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);