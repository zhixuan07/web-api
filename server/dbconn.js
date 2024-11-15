const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const cors = require('cors');
//const uri = "mongodb+srv://blackSoo:Soo0110@cluster0.pr5c9bh.mongodb.net/ervdb?retryWrites=true&w=majority&appName=Cluster0"
const uri = process.env.MONGOURI_DB
const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
    console.log(uri)
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
