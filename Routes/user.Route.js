const express = require("express");
const router = express.Router();
const userController = require("../Controllers/user.Controller");

router.post("/booking", userController.booking);

module.exports = router;
