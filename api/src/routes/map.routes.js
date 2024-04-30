const express = require("express");
const router = express.Router();
const MapController = require("../controllers/map.controller");
const { upload } = require("../utils/s3Utils");
// List route
router.get("/list", MapController.list);
router.delete("/delete", MapController.delete);
router.post("/create", upload.single("file"), MapController.create);
module.exports = router;
