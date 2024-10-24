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
    isAdmin: {
      type: String,
      default: false,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
