const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Blog = require('../models/Blog');

// @route   POST /api/blogs
// @desc    Create a new blog
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        console.log('Received blog creation request');
        console.log('Request body:', req.body);
        console.log('User:', req.user);

        const { title, content } = req.body;

        if (!title || !content) {
            console.log('Missing title or content');
            return res.status(400).json({ message: 'Title and content are required' });
        }

        const newBlog = new Blog({
            title,
            content,
            author: req.user.id,
            status: 'pending',
        });

        const blog = await newBlog.save();
        res.json(blog);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/blogs/my-blogs
// @desc    Get all blogs regarding current user
// @access  Private
router.get('/my-blogs', auth, async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.user.id }).sort({ createdAt: -1 });
        res.json(blogs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/blogs/:id
// @desc    Delete a blog
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Check user
        if (blog.author.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await blog.deleteOne();
        res.json({ message: 'Blog removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;
