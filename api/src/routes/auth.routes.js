const { Router } = require("express");
const router = Router();
const AuthController = require("../controllers/auth.controller");
const { authenticationMiddleware } = require("../middlewares/passport-setup");
// Login route
router.post("/login", AuthController.login);
router.put("/logout", authenticationMiddleware, AuthController.logout);
module.exports = router;
