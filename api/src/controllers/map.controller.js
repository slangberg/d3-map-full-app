const Map = require("../models/Map.model");
const sizeOf = require("image-size");
const { s3Upload, deleteFileFromS3 } = require("../utils/s3Utils");
module.exports = {
  create: async (req, res) => {
    try {
      if (req.file) {
        let dimensions = {};
        try {
          dimensions = sizeOf(req.file.buffer);
        } catch (error) {
          console.error("Failure to capture image dimensions");
        }

        const uploadResult = await s3Upload(req.file);
        const baseImageUrl = uploadResult.Location;
        const baseImageKey = uploadResult.Key;

        const { title, description, tags } = req.body;
        const userId = req.user._id;

        const newMap = new Map({
          title,
          description,
          user: userId,
          tags,
          baseImage: {
            url: baseImageUrl,
            key: baseImageKey,
            width: dimensions.width,
            height: dimensions.height,
          },
        });
        await newMap.save();
        res.json(newMap);
      } else {
        res.status(400).json({ error: "Error Persisting Map Image" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error creating map" });
    }
  },
  delete: async (req, res) => {
    try {
      const userId = req.user._id;
      const { mapId } = req.query;
      const map = await Map.findById(mapId);

      if (!map) {
        return res.status(404).json({ error: "Map not found" });
      }

      if (map.user.toString() !== userId.toString()) {
        return res
          .status(403)
          .json({ error: "Do not have permission to delete this map" });
      }

      const deleteRes = await deleteFileFromS3(map.baseImage.key);
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
      const { search, tags, sort = -1, page = 1 } = req.query;
      let query = { user: userId };

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: "i" } }, // Match title
          { description: { $regex: search, $options: "i" } }, // Match description
        ];
      }

      if (tags && tags.length) {
        query.tags = { $all: tags };
      }

      const options = {
        sort: { createdAt: sort },
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
        metaData: {
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
