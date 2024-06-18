const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/admin.Controller");

router.get("/validate-admin-token", adminController.validateAdminToken);
router.post("/add-product", adminController.addProduct);
router.delete("/remove-product", adminController.removeProduct);
router.put("/update-product", adminController.updateProduct);

module.exports = router;
