const Map = require("../models/Map.model"); // Import the Map model
module.exports = {
  create: async (req, res) => {
    try {
      // Extract user ID from the session
      const userId = req.user._id;
      const { title, description } = req.body;
      const newMap = new Map({ title, description, user: userId });
      await newMap.save();

      res.status(201).json(newMap);
    } catch (error) {
      console.error("Error creating map:", error);
      res.status(500).json({ error: "Error creating map" });
    }
  },
  list: async (req, res) => {
    try {
      // Extract user ID from the session
      const userId = req.user._id;

      // Find all maps belonging to the user
      const maps = await Map.find({ user: userId });

      res.json(maps);
    } catch (error) {
      console.error("Error getting user maps:", error);
      res.status(500).json({ error: "Error getting user maps" });
    }
  },
};
