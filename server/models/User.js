const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    emailOrMobile: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
    },
    location: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'blogs', 'news'],
        default: 'user',
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true, // Allows null values, only enforces uniqueness when value exists
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', userSchema);
