const express = require("express");
const {
  createComment,
  updateComment,
  deleteComment,
} = require("../../controllers/Comment/commentController");
const isLogin = require("../../middlewares/isLogin");
const commentRouter = express.Router();

commentRouter.post("/create/:id", isLogin, createComment);

commentRouter.put("/update/:id", isLogin, updateComment);

commentRouter.delete("/delete/:id", isLogin, deleteComment);

module.exports = commentRouter;
