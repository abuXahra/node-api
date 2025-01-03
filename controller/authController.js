const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.userRegister = async (req, res) => {
  try {
    // const { username, email, photo, password, role, isAdmin } = req.body;
    const {
      username,
      email,
      photo,
      password,
      role,
      facebookUrl,
      twitterUrl,
      instagramUrl,
      linkedInUrl,
    } = req.body;

    // const { username, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      photo,
      password: hashPassword,
      role,
      facebookUrl,
      twitterUrl,
      instagramUrl,
      linkedInUrl,
      // username,
      // email,
      // photo,

      // role,
      // isAdmin,
    });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.userLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User not found");
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(401).json("Wrong Credentials");
    }
    const token = jwt.sign(
      { _id: user._id, username: user.username, email: user.email },
      process.env.MONGODB_SECRETE,
      { expiresIn: "3d" }
    );
    const { password, ...info } = user._doc;
    res.cookie("token", token).status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.userLogout = async (req, res) => {
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .send("User Logged out Successfuly");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.userRefetch = (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.MONGODB_SECRETE, {}, async (err, data) => {
    if (err) {
      return res.status(404).json(err);
    }
    res.status(200).json(data);
  });
};
