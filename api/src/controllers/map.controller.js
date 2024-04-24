const Map = require("../models/Map.model"); // Import the Map model
module.exports = {
  create: async (req, res) => {
    try {
      // Extract user ID from the session
      const userId = req.user._id;
      const { title, description, tags } = req.body;
      const newMap = new Map({ title, description, user: userId, tags });
      await newMap.save();

      res.status(201).json(newMap);
    } catch (error) {
      console.error("Error creating map:", error);
      res.status(500).json({ error: "Error creating map" });
    }
  },
  list: async (req, res) => {
    try {
      const userId = req.user._id;
      const { title, tags } = req.query;
      let query = { user: userId };

      if (req.query.title) {
        query.title = { $regex: title, $options: "i" };
      }

      if (req.query.tags) {
        query.tags = { $all: tags };
      }

      // Query the database for maps
      const maps = await Map.find(query);
      // Query for all distinct tags
      const allTags = await Map.distinct("tags", { user: userId });

      res.json({ maps, allTags });
    } catch (error) {
      console.error("Error getting user maps:", error);
      res.status(500).json({ error: "Error getting user maps" });
    }
  },
};
