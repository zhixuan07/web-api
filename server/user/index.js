const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const connectDB = require("../dbconn");
const { v4: uuidv4 } = require("uuid");
const User = require("../schema/user");;
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.post("/api/register", async (req, res) => {
  try {
    await connectDB();
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      uuid: uuidv4(),
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    switch (error.code) {
      case 11000:
        return res
          .status(400)
          .json({ message: "Username or email already exists" });
      default:
        return res.status(500).json({ message: "An error occurred" });
    }
  } finally {
    mongoose.connection.close();
  }
});

app.post("/api/login", async (req, res) => {
  try {
    await connectDB();
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!email) {
      return res.status(400).json({ error: "Invalid email" });
    }
    
    /*const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: " Invalid password" });
    }*/
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token ,user});
  } catch (error) {

    res.status(500).json({ message: error});
  } finally {
    mongoose.connection.close();
  }
});

app.post("/api/update", async (req, res) => {
  try {
    await connectDB();
  
    const { uuid,username,email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOneAndUpdate({uuid:uuid},{$set:{username:username,email:email,password:hashedPassword}}
      )
      console.log(user)
      res.status(200).json({ message: "User updated successfully" ,user:user});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error});
  }finally {
    mongoose.connection.close();
  }
    
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
