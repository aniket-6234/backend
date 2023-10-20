const express = require("express");
require("dotenv").config();
const { mongoDBConnect } = require("./config/databaseConnection");
const userRouter = require("./routes/User/userRoutes");
const postRouter = require("./routes/Post/postRoutes");
const commentRouter = require("./routes/Comment/commentRoutes");
const categoryRouter = require("./routes/Category/categoryRoutes");


// intialize app
const app = express();

// work like body-parser
app.use(express.json());

// middleware

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/categories", categoryRouter);

// error handlers middleware

// database connection
mongoDBConnect();

// listen to server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log("Server Listening on Port -> ", PORT);
});
