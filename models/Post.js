const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    desc: {
      type: String,
      require: true,
      unique: true,
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    views: { type: Number, default: 0 },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

PostSchema.method.incrementViews = async function () {
  this.view + 1;
};

module.exports = mongoose.model("Post", PostSchema);
