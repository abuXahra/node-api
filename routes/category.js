const express = require("express")
const router = express.Router()
const Category = require('../models/Category')
const Post = require('../models/Post')
const verifyToken = require("../verifyToken")


// ================CATEGORTY ROUTES============




// CREATE
router.post('/create', async (req, res) => {
    try {
        const newCat = new Category(req.body)
        const savedCat = await newCat.save()
        res.status(200).json(savedCat);
    } catch (err) {
        res.status(500).json(err)
    }
})



//UPDATE
router.put('/:id', async (req, res) => {
    try {
        const updatedCat = await Category.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedCat);

    } catch (err) {
        res.status(500).json(err)
    }
})


//DELETE
router.delete('/:id', async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id)
        res.status(200).json('Category has been deleted')
    } catch (err) {
        res.status(500).json(err)
    }
})


// GET All category
router.get('/', async (req, res) => {
    try {
        const cats = await Category.find().populate('posts')
        res.status(200).json(cats)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET CATEGORY DETAIL
router.get('/:id', async (req, res) => {
    try {
        const cat = await Category.findById(req.params.id)
        res.status(200).json(cat)
    } catch (err) {
        res.status(500).json(err);
    }
})


//GET CATEGORY POST

// Endpoint to get posts by a specific category ID

// without pagination
router.get('/:categoryId/posts', async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const posts = await Post.find({ categories: categoryId }).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// with pagination
router.get('/:categoryId/post', async (req, res) => {

    try {
        const categoryId = req.params.categoryId;

        let query = Post.find({ categories: categoryId }).sort({ createdAt: -1 });

        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.limit) || 4;
        const skip = (page - 1) * pageSize;
        const total = await Post.countDocuments();

        const pages = Math.ceil(total / pageSize);

        query = query.skip(skip).limit(pageSize);

        if (page > pages) {
            return res.status(404).json({
                status: "fail",
                message: "No page found",
            });
        }

        const result = await query;

        res.status(200).json({
            status: "success",
            count: result.length,
            page,
            pages,
            data: result,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            message: "Server Error",
        });
    }
});




module.exports = router;