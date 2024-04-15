const argon2 = require("argon2");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await argon2.hash(password);
      const user = new User({ username, password: hashedPassword });
      await user.save();
      res.json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error registering user" });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
      const isValidPassword = await argon2.verify(user.password, password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
      const token = jwt.sign({ username: user.username }, "secretkey");
      res.json({ token, username });
    } catch (error) {
      res.status(500).json({ error: "Error logging in" });
    }
  },
};
