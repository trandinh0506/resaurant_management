const Product = require("../Models/product.Model");
class adminController {
    async addProduct(req, res) {
        try {
            console.log(req.body);
            const { name, price, description, category } = req.body;
            const newProduct = new Product({
                name,
                price,
                description,
                category,
            });
            await newProduct.save();
            res.json({ status: 200, message: "Product added successfully!" });
        } catch (err) {
            res.status(500).json({ status: 500, message: err.message });
        }
    }
    async removeProduct(req, res) {}
    async updateProduct(req, res) {}
}

module.exports = new adminController();
