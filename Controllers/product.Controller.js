const product = require("../Models/product.Model");

class productController {
    index(req, res) {}
    get(req, res) {
        res.send(product.find());
    }
}

module.exports = new productController();
