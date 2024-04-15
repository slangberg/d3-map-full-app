const express = require("express");
const router = express.Router();
const MapController = require("../controllers/map.controller");

// List route
router.get("/list", MapController.list);
router.post("/create", MapController.create);
module.exports = router;
