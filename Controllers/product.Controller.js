const product = require("../Models/product.Model");

class productController {
    index(req, res) {}
    async get(req, res) {
        const result = await product.find();
        res.json(result);
    }
}

module.exports = new productController();
