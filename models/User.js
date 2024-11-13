const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    photo: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      require: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "sub-admin", "user"],
      default: "user",
    },
    facebookUrl: {
      type: String,
      required: false,
    },
    twitterUrl: {
      type: String,
      required: false,
    },
    instagramUrl: {
      type: String,
      required: false,
    },
    linkedInUrl: {
      type: String,
      required: false,
    },
    isAdmin: {
      type: String,
      default: false,
      require: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
