// server/config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Tries to connect to the database using the string in your .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // If successful, it prints a confirmation message
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If it fails, it prints the error and stops the application
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
