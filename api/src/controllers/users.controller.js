const passport = require("passport");

const User = require("../models/User.model");

module.exports = {
  list: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Error getting users" });
    }
  },
};
