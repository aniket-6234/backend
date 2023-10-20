const express = require("express");
const {
  userRegisterCtrl,
  userLoginCtrl,
  usersCtrl,
  userProfileCtrl,
  userDeleteCtrl,
  userUpdateCtrl,
  userProfilePhotoUpdateCtrl,
} = require("../../controllers/User/userController");
const isLogin = require("../../middlewares/isLogin");
const storage = require("../../config/cloudinaryConnection");
const userRouter = express.Router();
const multer = require("multer");


// instance of multer
const upload = multer({ storage });

// POST: user register
userRouter.post("/register", userRegisterCtrl);

// POST: user login
userRouter.post("/login", userLoginCtrl);

// GET: get all user
userRouter.get("/users", usersCtrl);

// GET: user profile
userRouter.get("/profile", isLogin, userProfileCtrl);

// DELETE: user delete
userRouter.delete("/user/:id", userDeleteCtrl);

// PUT: user update
userRouter.put("user/:id", userUpdateCtrl);

// POST: user profile photo update
userRouter.post("/profile-photo-upload", upload.single('profile'), userProfilePhotoUpdateCtrl);

module.exports = userRouter;
