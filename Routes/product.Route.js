const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.Controller");

router.get("/get", productController.get);
router.get("/", productController.index);
module.exports = router;
