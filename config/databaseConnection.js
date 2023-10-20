const mongoose = require("mongoose");

// function to connect the database
const mongoDBConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database is Connected!");
  } catch (error) {
    console.log("DB: -> ", error.message);
    process.exit(1);
  }
};

module.exports = { mongoDBConnect };
