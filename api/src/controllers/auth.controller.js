const argon2 = require("argon2");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    try {
      const { username, firstName, lastName, email, password } = req.body;

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "Username unavailable" });
      }

      const hashedPassword = await argon2.hash(password);
      const user = new User({
        username,
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      await user.save();
      res.json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error registering user" });
    }
  },
  logout: async (req, res) => {
    try {
      // Extract user ID from the session
      const userId = req.user._id;
      const user = await User.findById(userId);
      user.token = null;
      await user.save();
      res.json({ message: `${user.username} has been logged out` });
    } catch (error) {
      res.status(500).json({ error: "Logout " });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const userId = req.user._id;

      // Find the user by ID and delete it
      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
      res.status(500).json({ error: "Error deleting user" });
    }
  },
  login: async (req, res) => {
    try {
      const { username, password, ...rest } = req.body;
      const user = await User.findOne({ username });
      console.log({ username, password, rest });
      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
      const isValidPassword = await argon2.verify(user.password, password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
      const token = jwt.sign({ username: user.username }, "secretkey", {
        expiresIn: "1w",
      });
      res.json({ token, username });
    } catch (error) {
      res.status(500).json({ error: "Error logging in" });
    }
  },
};
