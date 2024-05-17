const Marker = require("../models/Map.model");
const { s3Upload, deleteFileFromS3 } = require("../utils/s3Utils");
module.exports = {
  create: async (req, res) => {
    try {
      if (req.file) {
        const uploadResult = await s3Upload(req.file);
        const baseImageUrl = uploadResult.Location;
        const baseImageKey = uploadResult.Key;

        const { markerId, width, height, xOffset, yOffset } = req.body;
        const userId = req.user._id;

        const newMap = new Marker({
          markerId,
          width,
          height,
          xOffset,
          yOffset,
          user: userId,
          baseImage: {
            url: baseImageUrl,
            key: baseImageKey,
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
      const { markerId } = req.query;
      const marker = await Marker.findById(markerId);

      if (!marker) {
        return res.status(404).json({ error: "Map not found" });
      }

      if (marker.user.toString() !== userId.toString()) {
        return res
          .status(403)
          .json({ error: "Do not have permission to delete this marker" });
      }

      const deleteRes = await deleteFileFromS3(marker.baseImage.key);
      const deletedMap = await Map.findByIdAndDelete(markerId);
      res.json({ message: `${deletedMap.title} deleted successfully` });
    } catch (error) {
      res.status(500).json({ error: "Error deleting marker" });
    }
  },
  list: async (req, res) => {
    try {
      const userId = req.user._id;
      const { mapID } = req.query;
      let query = { user: userId, map: mapID };

      const options = {
        lean: true,
      };

      const markers = await Map.find(query, null, options);

      const dictionary = markers.reduce((acc, asset) => {
        acc[asset.id] = asset;
        return acc;
      }, {});

      res.json(dictionary);
    } catch (error) {
      console.error("Error getting user maps:", error);
      res.status(500).json({ error: "Error getting user maps" });
    }
  },
};
