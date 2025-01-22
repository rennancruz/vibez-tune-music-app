const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user"); // Adjust the path as necessary
const router = express.Router();

router.post("/users", async (req, res) => {
  const { email, userName, password } = req.body;

  try {
    module.exports = {
      // Get all users
      async getUsers(req, res) {
        try {
          const users = await User.find();
          res.json(users);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
    };
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      userName,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
