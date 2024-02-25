const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/admin.Controller");

router.put("/addProduct", adminController.addProduct);
router.delete("/removeProduct", adminController.removeProduct);
router.put("/addProduct", adminController.updateProduct);

module.exports = router;
