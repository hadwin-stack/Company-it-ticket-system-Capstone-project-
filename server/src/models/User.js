const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true, // Prevents two users from signing up with the same email
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6 // Enforces security validation rules
    },
    role: {
        type: String,
        enum: ['employee', 'admin'],
        default: 'employee' // Automatically sets new sign-ups as regular employees
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
