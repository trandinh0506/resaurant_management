const express = require("express");
const router = express.Router();
const tableController = require("../Controllers/table.Controller");

router.get("/get", tableController.get);

module.exports = router;
