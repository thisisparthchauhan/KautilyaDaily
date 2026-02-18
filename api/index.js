// Vercel Serverless Function Handler
let app;

try {
    app = require('../server/index.js');
} catch (err) {
    console.error('Failed to initialize server:', err);
    app = (req, res) => {
        res.status(500).json({
            message: 'Server Initialization Failed',
            error: err.message,
            stack: err.stack
        });
    };
}

module.exports = async (req, res) => {
    try {
        if (app.connectDB) {
            await app.connectDB();
        }
        return app(req, res);
    } catch (err) {
        console.error('Request Handler Error:', err);
        res.status(500).json({
            message: 'Request Handler Failed',
            error: err.message,
            stack: err.stack
        });
    }
};
