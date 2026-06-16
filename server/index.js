const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Passport config
require('./config/passport')(passport);

// Middleware
app.use(cors({
    origin: [process.env.FRONTEND_URL || 'http://localhost:5000', 'http://127.0.0.1:5000', 'http://localhost:5000'],
    credentials: true
}));
app.use(express.json());

// Session middleware (required for Passport)
app.use(session({
    secret: process.env.SESSION_SECRET || 'kautilya-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Database Connection
// Database Connection
let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kautilyadaily', {
            bufferCommands: false, // Disable mongoose buffering
        });
        isConnected = db.connections[0].readyState;
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        isConnected = false;
        // If imported (Serverless), throw the error so the handler knows we failed
        if (require.main !== module) throw err;
    }
};

// Attach to app for serverless usage
app.connectDB = connectDB;

// Only connect automatically in dev/production server mode, NOT when imported
if (require.main === module) {
    connectDB();
}

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/blog');
const adminRoutes = require('./routes/admin');

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Global Error Handler to ensure JSON response
app.use((err, req, res, next) => {
    console.error('Unhandled Express Error:', err);
    res.status(500).json({
        message: 'Internal Server Error',
        error: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
