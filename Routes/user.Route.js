const express = require("express");
const router = express.Router();
const userController = require("../Controllers/user.Controller");

router.post("/booking", userController.booking);
router.get("/view-ordered-items", userController.viewOrderedItems);
router.get("/payment", userController.pay);
router.get("/reset-table", userController.resetTable);
module.exports = router;
