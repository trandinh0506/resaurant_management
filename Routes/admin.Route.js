const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/admin.Controller");

router.get("/validateAdminToken", adminController.validateAdminToken);
router.post("/addProduct", adminController.addProduct);
router.delete("/removeProduct/:id", adminController.removeProduct);
router.put("/updateProduct/:id", adminController.updateProduct);

module.exports = router;
