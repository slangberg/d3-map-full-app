const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users.controller");
const { authenticationMiddleware } = require("../middlewares/passport-setup");
router.post("/register", UsersController.register);
router.delete("/delete", authenticationMiddleware, UsersController.deleteUser);
router.put("/update", authenticationMiddleware, UsersController.updateAccount);
module.exports = router;
