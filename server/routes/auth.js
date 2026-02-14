const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // In production, use .env

// Sign Up
router.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, emailOrMobile, password, confirmPassword } = req.body;

        // Basic Validation
        if (!firstName || !lastName || !emailOrMobile || !password || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Check if user exists
        const existingUser = await User.findOne({ emailOrMobile });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email/mobile' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            firstName,
            lastName,
            emailOrMobile,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        // Create JWT Token
        const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({
            token,
            user: {
                id: savedUser._id,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                emailOrMobile: savedUser.emailOrMobile,
            },
            message: 'User created successfully',
        });
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { emailOrMobile, password } = req.body;

        // Validation
        if (!emailOrMobile || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check user
        const user = await User.findOne({ emailOrMobile });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT Token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

        res.json({
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                emailOrMobile: user.emailOrMobile,
            },
            message: 'Login successful',
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
