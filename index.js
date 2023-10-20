const express = require('express');
require('dotenv').config();
const { mongoDBConnect } = require('./config/databaseConnection');
const userRouter = require('./routes/User/userRoutes');

const app = express();

// work like body-parser
app.use(express.json()) 


// middleware


// routes
app.use("/api/v1", userRouter);



// error handlers middleware

// database connection
mongoDBConnect();

// listen to server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => { console.log("Server Listening on Port -> ", PORT)});