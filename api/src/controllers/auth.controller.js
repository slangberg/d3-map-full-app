const argon2 = require("argon2");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

module.exports = {
  logout: async (req, res) => {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId);
      user.token = null;
      await user.save();
      res.json({ message: `${user.username} has been logged out` });
    } catch (error) {
      res.status(500).json({ error: "Error Logging Out" });
    }
  },
  login: async (req, res) => {
    try {
      const { username, password, ...rest } = req.body;
      const user = await User.findOne({ username });
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
      const { firstName, lastName, email } = user;
      res.json({ token, firstName, lastName, email });
    } catch (error) {
      console.log("LOGIN ERROR", error);
      res.status(500).json({ error: "Error logging in" });
    }
  },
};
