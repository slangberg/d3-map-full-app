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
  updateAccount: async (req, res) => {
    try {
      const userId = req.user._id;
      const { firstName, lastName, email, oldPassword, newPassword } = req.body;
      const user = await User.findById(userId);
      if (newPassword && oldPassword) {
        const isValidPassword = await argon2.verify(user.password, oldPassword);
        if (!isValidPassword) {
          return res.status(401).json({ error: "Invalid existing password" });
        }
        user.password = await argon2.hash(newPassword);
      }
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (email) user.email = email;

      await user.save();

      res.json({
        message: "Account updated successfully",
        firstName,
        lastName,
        email,
      });
    } catch (error) {
      res.status(500).json({ error: "Error updating account" });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const userId = req.user._id;
      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
      res.status(500).json({ error: "Error deleting user" });
    }
  },
};
