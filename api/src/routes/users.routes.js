const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users.controller");

router.post("/register", UsersController.register);
router.put("/delete", UsersController.updateAccount);
router.put("/update", UsersController.deleteUser);
module.exports = router;
