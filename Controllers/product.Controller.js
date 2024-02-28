const products = require("../products");

class productController {
    async get(req, res) {
        res.status(200).json(await products.get());
    }
}

module.exports = new productController();
