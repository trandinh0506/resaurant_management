const express = require("express");
const router = express.Router();
const productController = require("../Controllers/product.Controller");

router.get("/get", productController.get);
router.get("/", productController.index);
module.exports = router;
