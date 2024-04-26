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
      const { search, tags, page = 1, limit = 15 } = req.query;
      let query = { user: userId };

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: "i" } }, // Match title
          { description: { $regex: search, $options: "i" } }, // Match description
        ];
      }

      if (tags) {
        query.tags = { $all: tags };
      }

      const options = {
        lean: true, // Use lean() for better performance
        limit: parseInt(limit),
        skip: (parseInt(page) - 1) * parseInt(limit),
      };

      // Query the database for maps with pagination
      const maps = await Map.find(query, null, options);
      // Get total count of maps for pagination
      const totalMaps = await Map.countDocuments(query);

      // Calculate total pages
      const totalPages = Math.ceil(totalMaps / parseInt(limit));

      // Query for all distinct tags
      const allTags = await Map.distinct("tags", { user: userId });

      res.json({
        maps,
        metadata: {
          totalMaps,
          totalPages,
          page: parseInt(page),
          limit: parseInt(limit),
        },
        allTags,
      });
    } catch (error) {
      console.error("Error getting user maps:", error);
      res.status(500).json({ error: "Error getting user maps" });
    }
  },
};
