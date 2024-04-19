const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
// Register route
router.post("/register", AuthController.register);

// Login route
router.post("/login", AuthController.login);
router.post("/logout", AuthController.login);
module.exports = router;
