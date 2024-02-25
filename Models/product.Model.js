const productSchema = require("../Schemas/product.Schema");
const mongoose = require("mongoose");

const Product = mongoose.model("products", productSchema);

module.exports = Product;
