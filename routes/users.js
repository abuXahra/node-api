const express = require("express")
const route = express.Router()
const User = require("../models/User")
const Post = require("../models/Post")
const Comment = require("../models/Comment")
const bcrypt = require('bcrypt')
const verifyToken = require("../verifyToken")

// ================ROUTES============


//UPDATE
route.put('/:id', verifyToken, async (req, res) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedUser);

    } catch (err) {
        res.status(500).json(err)
    }
})


//DELETE
route.delete('/:id', verifyToken, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        await Post.deleteMany({ userId: req.params.id })
        await Comment.deleteMany({ userId: req.params.id })
        res.status(200).json('User has been deleted')
    } catch (err) {
        res.status(500).json(err)
    }
})


//GET SINGLE USER
route.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId); // Retrieve user from MongoDB by ID
        res.json(user); // Send user data as JSON response
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// route.get('/:id', async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id)
//         const { password, ...info } = user._doc //to remove the password for the get result
//         res.status(200).json(info)
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })


//GET ALL USERS
route.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err);
    }
})







//2: 08: 27


module.exports = route;