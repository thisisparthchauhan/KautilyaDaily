module.exports = (req, res) => {
    res.status(200).json({
        message: "If you see this, Vercel Function execution is WORKING.",
        env: {
            node_env: process.env.NODE_ENV,
            has_mongo_uri: !!process.env.MONGODB_URI
        }
    });
};
