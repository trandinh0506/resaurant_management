const Product = require("../Models/product.Model");

class productController {
    async get(req, res) {
        const result = await Product.find();
        res.json(result);
    }
}

module.exports = new productController();
