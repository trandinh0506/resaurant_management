const product = require("../Models/product.Model");

class productController {
    index(req, res) {}
    get(req, res) {
        res.send("ok product");
        console.log(product.find());
    }
}

module.exports = new productController();
