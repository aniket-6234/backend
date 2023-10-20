const express = require('express');
const { userRegisterCtrl, userLoginCtrl, usersCtrl, userProfileCtrl, userDeleteCtrl, userUpdateCtrl } = require('../../controllers/User/userController');
const userRouter = express.Router();


// POST: user register
userRouter.post('/register', userRegisterCtrl);

// POST: user login
userRouter.post('/login', userLoginCtrl);

// GET: get all user
userRouter.get('/users', usersCtrl)

// GET: user profile
userRouter.get("/profile/:id", userProfileCtrl)

// DELETE: user delete
userRouter.delete('/user/:id', userDeleteCtrl)

// PUT: user update
userRouter.put("user/:id", userUpdateCtrl)

module.exports = userRouter;