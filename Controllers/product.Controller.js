const Product = require("../Models/Product.Model");

class productController {
    index(req, res) {}
    async get(req, res) {
        const result = await Product.find();
        res.json(result);
    }
}

module.exports = new productController();
