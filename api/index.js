// Vercel Serverless Function Handler
const app = require('../server/index.js');

module.exports = (req, res) => {
    // Ensure the app handles the request properly
    // Vercel passes the request to the exported function
    // If it's an express app, it's a function (req, res) => ...
    return app(req, res);
};
