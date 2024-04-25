const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users.controller");

router.post("/register", UsersController.register);
router.delete("/delete", UsersController.deleteUser);
router.put("/update", UsersController.updateAccount);
module.exports = router;
