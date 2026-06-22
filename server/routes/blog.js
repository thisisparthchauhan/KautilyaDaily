const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Blog = require('../models/Blog');

// GET /api/blogs — all approved blogs (public)
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find({ status: 'approved' })
            .populate('author', ['firstName', 'lastName', 'role'])
            .sort({ createdAt: -1 });
        res.json(blogs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// GET /api/blogs/saved — user's saved blogs (must be before /:id)
router.get('/saved', auth, async (req, res) => {
    try {
        const blogs = await Blog.find({ savedBy: req.user.id, status: 'approved' })
            .populate('author', ['firstName', 'lastName', 'role'])
            .sort({ createdAt: -1 });
        res.json(blogs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// GET /api/blogs/my-blogs — current user's blogs (must be before /:id)
router.get('/my-blogs', auth, async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.user.id }).sort({ createdAt: -1 });
        res.json(blogs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// GET /api/blogs/:id — single approved blog
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findOne({ _id: req.params.id, status: 'approved' })
            .populate('author', ['firstName', 'lastName', 'role']);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json(blog);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') return res.status(404).json({ message: 'Blog not found' });
        res.status(500).send('Server Error');
    }
});

// POST /api/blogs — create blog
router.post('/', auth, async (req, res) => {
    try {
        const { title, content, image } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }
        const newBlog = new Blog({
            title,
            content,
            image: image || undefined,
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

// POST /api/blogs/:id/like — toggle like
router.post('/:id/like', auth, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        const idx = blog.likes.findIndex(id => id.toString() === req.user.id);
        if (idx > -1) {
            blog.likes.splice(idx, 1);
        } else {
            blog.likes.push(req.user.id);
        }
        await blog.save();
        res.json({ likes: blog.likes.length, liked: idx === -1 });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST /api/blogs/:id/save — toggle save
router.post('/:id/save', auth, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        const idx = blog.savedBy.findIndex(id => id.toString() === req.user.id);
        if (idx > -1) {
            blog.savedBy.splice(idx, 1);
        } else {
            blog.savedBy.push(req.user.id);
        }
        await blog.save();
        res.json({ saved: idx === -1 });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// DELETE /api/blogs/:id — delete own blog
router.delete('/:id', auth, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        if (blog.author.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }
        await blog.deleteOne();
        res.json({ message: 'Blog removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') return res.status(404).json({ message: 'Blog not found' });
        res.status(500).send('Server Error');
    }
});

module.exports = router;
