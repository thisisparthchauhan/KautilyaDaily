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
        // RETURN ACTUAL ERROR FOR DEBUGGING
        res.status(500).json({ message: 'Server error', error: error.message, stack: error.stack });
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

// Google OAuth Routes
const passport = require('passport');

// Debug Route (Temporary)
router.get('/debug', (req, res) => {
    const mongoose = require('mongoose');
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const mongoUri = process.env.MONGODB_URI;

    res.json({
        message: 'System Debug Info',
        nodeEnv: process.env.NODE_ENV,
        mongoConnectionState: mongoose.connection.readyState, // 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
        env: {
            mongoUriExists: !!mongoUri,
            clientIdExists: !!clientId,
            clientSecretExists: !!clientSecret,
            jwtSecretExists: !!process.env.JWT_SECRET
        }
    });
});

// Initiate Google OAuth
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth Callback
router.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:5000'}?error=google_auth_failed` }),
    (req, res) => {
        try {
            // Generate JWT token
            const token = jwt.sign({ id: req.user._id }, JWT_SECRET, { expiresIn: '7d' });

            // Prepare user data
            const userData = {
                id: req.user._id,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                emailOrMobile: req.user.emailOrMobile,
                role: req.user.role,
            };

            // Redirect to frontend with token and user data
            const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5000';
            res.redirect(`${frontendURL}?token=${token}&user=${encodeURIComponent(JSON.stringify(userData))}`);
        } catch (error) {
            console.error('Google callback error:', error);
            res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5000'}?error=auth_failed`);
        }
    }
);

module.exports = router;
