const mongoose = require("mongoose");

// create the post schema
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "post title is required"],
    },
    description: {
      type: String,
      required: [true, "post description is required"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "post category is required"],
    },
    numberOfViews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "please author is required"],
    },
    image: {
      type: String,
      required: [true, "post image is required"],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
