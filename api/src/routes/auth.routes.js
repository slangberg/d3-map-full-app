const { Router } = require("express");
const router = Router();
const AuthController = require("../controllers/auth.controller");
// Login route
router.post("/login", AuthController.login);
router.put("/logout", AuthController.logout);
module.exports = router;
