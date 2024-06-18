const express = require("express");
const router = express.Router();
const tableController = require("../Controllers/table.Controller");

router.get("/get", tableController.get);
router.get("/choose-table", tableController.chooseTable);

module.exports = router;
