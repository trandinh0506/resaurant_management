const product = require("../Models/product.Model");

class productController {
    index(req, res) {}
    get(req, res) {
        res.send(JSON.stringify({ data: product.find() }));
    }
}

module.exports = new productController();
