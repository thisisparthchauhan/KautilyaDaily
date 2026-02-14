const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const User = require('../models/User');
const Blog = require('../models/Blog');

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', auth, admin, async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/admin/blogs
// @desc    Get all blogs (with optional status filter)
// @access  Private/Admin
router.get('/blogs', auth, admin, async (req, res) => {
    try {
        const { status } = req.query;
        let query = {};
        if (status) query.status = status;

        const blogs = await Blog.find(query)
            .populate('author', ['firstName', 'lastName', 'emailOrMobile'])
            .sort({ createdAt: -1 });

        res.json(blogs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/admin/blogs/:id/status
// @desc    Update blog status (approve/reject)
// @access  Private/Admin
router.put('/blogs/:id/status', auth, admin, async (req, res) => {
    const { status } = req.body;

    if (!['approved', 'rejected', 'pending'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    try {
        let blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        blog.status = status;
        await blog.save();

        res.json(blog);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/admin/users/:id/role
// @desc    Update user role (make admin)
// @access  Private/Admin
router.put('/users/:id/role', auth, admin, async (req, res) => {
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
    }

    try {
        let user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.role = role;
        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
