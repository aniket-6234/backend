const Post = require("../../models/Post/Post");
const User = require("../../models/User/User");

// POST: create a new post
const createPostCtrl = async (req, res, next) => {
  console.log("file: ", req.file);
  const { title, description } = req.body;
  try {
    if (title && description) {
      const author = await User.findById(req.userAuth);
      if (author) {
        const postCreated = await Post.create({
          title,
          description,
          user: author._id,
          image: req?.file?.path,
        });
        author.posts.push(postCreated);
        await author.save();
        res.json({
          status: "success",
          data: postCreated,
        });
      }
    }
  } catch (error) {
    next(new Error(error));
  }
};

const fetchAllPostCtrl = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.json({
      status: "success",
      data: posts,
    });
  } catch (error) {
    next(new Error(error));
  }
};

// LIKE and UNLIKE A POST
const toggleLikePostCtrl = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    const isLiked = post.likes.includes(req.userAuth);
    if (isLiked) {
      post.likes = post.likes.filter(
        (like) => like.toString() !== req.userAuth.toString()
      );
      await post.save();
    } else {
      post.likes.push(req.userAuth);
      await post.save();
    }
    res.json({
      status: "success",
      data: "liked the post",
    });
  } catch (error) {
    next(new Error(error));
  }
};

// GET : single Post,\
const postDetailCtrl = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(new Error(error));
  }
};

// DELETE : single Post,\
const deletePostCtrl = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.user.toString() !== req.userAuth.toString()) {
      next(new Error("You are not allowed to delete"));
    }
    await Post.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      data: "post deleted successfully",
    });
  } catch (error) {
    next(new Error(error));
  }
};

// GET : single Post,\
const updatePostCtrl = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (post.user.toString() !== req.userAuth.toString()) {
      next(new Error("You are not allowed to update"));
    }
    await Post.findByIdAndUpdate(req.params.id, {
      title,
      description,
      image: req?.file?.path,
    });
    res.json({
      status: "success",
      data: "post updated successfully",
    });
  } catch (error) {
    next(new Error(error));
  }
};

module.exports = {
  createPostCtrl,
  toggleLikePostCtrl,
  fetchAllPostCtrl,
  postDetailCtrl,
  deletePostCtrl,
  updatePostCtrl,
};
