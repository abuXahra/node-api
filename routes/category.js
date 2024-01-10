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
        const cats = await Category.find()
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
router.get("/ssf:categoryId/posts/", async (req, res) => {
    try {
        const posts = await Post.find({ categories: req.params.title }).populate('posts').sort({ createdAt: -1 })
        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json(err);
    }
})


// Endpoint to get posts by a specific category ID
router.get('/:categoryId/posts', async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const posts = await Post.find({ categories: categoryId });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;