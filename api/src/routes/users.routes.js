const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users.controller");

// List route
router.get("/", UsersController.list);

module.exports = router;
