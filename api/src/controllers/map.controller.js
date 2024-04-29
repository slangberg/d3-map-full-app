const Map = require("../models/Map.model"); // Import the Map model
const { s3Upload } = require("../utils/awsUpload");
module.exports = {
  create: async (req, res) => {
    try {
      if (req.file) {
        // Make sure 'file' is part of the multipart/form-data
        const uploadResult = await s3Upload(req.file);
        const baseImage = uploadResult.Location; // Get the URL of the uploaded file
        // Continue with creating the map
        const { title, description, tags } = req.body;
        const userId = req.user._id;
        const newMap = new Map({
          title,
          description,
          user: userId,
          tags,
          baseImage,
        });
        await newMap.save();
        res.json(newMap);
      } else {
        res.status(400).json({ error: "No file uploaded" });
      }
    } catch (error) {
      console.error("Error creating map:", error);
      res.status(500).json({ error: "Error creating map" });
    }
  },
  delete: async (req, res) => {
    try {
      const userId = req.user._id;
      const { mapId } = req.query;
      const map = await Map.findById(mapId);
      console.log({ mapId, map });

      if (!map) {
        return res.status(404).json({ error: "Map not found" });
      }

      if (map.user.toString() !== userId.toString()) {
        return res
          .status(403)
          .json({ error: "Do not have permission to delete this map" });
      }

      const deletedMap = await Map.findByIdAndDelete(mapId);

      res.json({ message: `${deletedMap.title} deleted successfully` });
    } catch (error) {
      res.status(500).json({ error: "Error deleting map" });
    }
  },
  list: async (req, res) => {
    const limit = 15;
    try {
      const userId = req.user._id;
      const { search, tags, page = 1 } = req.query;
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
        sort: { createdAt: -1 },
        lean: true, // Use lean() for better performance
        limit,
        skip: (parseInt(page) - 1) * limit,
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
        },
        allTags,
      });
    } catch (error) {
      console.error("Error getting user maps:", error);
      res.status(500).json({ error: "Error getting user maps" });
    }
  },
};
