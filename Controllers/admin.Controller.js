const Product = require("../Models/product.Model");
class adminController {
    async addProduct(req, res) {
        const { name, price, description, category } = req.body;
        const newProduct = new Product({ name, price, description, category });
        await newProduct.save();
        res.json({ status: 200, message: "Product added successfully!" });
    }
    async removeProduct(req, res) {}
    async updateProduct(req, res) {}
}

module.exports = new adminController();
