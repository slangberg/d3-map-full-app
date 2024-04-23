const { Router } = require("express");
const router = Router();
const AuthController = require("../controllers/auth.controller");
// Register route
router.post("/register", AuthController.register);

// Login route
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
module.exports = router;
