const express = require("express")
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')





//REGISTER
const userRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ username, email, password: hashPassword })
        const savedUser = await newUser.save()
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json(err)
    }
}


//LOGIN
const userLogin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).json("User not found")
        }
        const match = bcrypt.compare(req.body.password, user.password)
        if (!match) {
            return res.status(401).json('Wrong Credentials')
        }
        const token = jwt.sign({ id: user._id }, process.env.MONGODB_SECRETE, { expiresIn: "3d" })
        const { password, ...info } = user._doc
        res.cookie("token", token).status(200).json(info);
    } catch (err) {
        res.status(500).json(err)
    }
}
//1: 55: 29

//LOGOUT
const userLogout = async (req, res) => {
    try {
        res.clearCookie("token", { sameSite: "none", secure: true }).status(200).send("User Logged out Successfuly")
    } catch (err) {
        res.status(500).json(err)
    }
}


module.exports = {
    userRegister,
    userLogin,
    userLogout
}