const Product = require("../Models/product.Model");
const products = require("../products");

class adminController {
    async addProduct(req, res) {
        try {
            const { name, price, description, category } = req.body;
            const newProduct = new Product({
                name,
                price,
                description,
                category,
                modify: true,
            });
            await newProduct.save();
            await products.update();
            res.status(201).json({
                status: 201,
                message: "Product added successfully!",
            });
        } catch (err) {
            res.status(500).json({ status: 500, message: err.message });
        }
    }
    async removeProduct(req, res) {
        try {
            const id = req.params.id;
            const result = await Product.findByIdAndDelete(id);
            if (result) {
                await products.update();
                res.status(200).json({
                    message: "Deleted product successfully",
                });
            } else {
                res.status(404).json({ message: "id not found" });
            }
        } catch (err) {
            console.log("error: ", err);
            res.status(500).json({ status: 500, message: err.message });
        }
    }
    async updateProduct(req, res) {
        try {
            const id = req.params.id;
            const { name, price, description, category } = req.body;

            const updatedData = {
                name,
                price,
                description,
                category,
            };

            const result = await Product.findByIdAndUpdate(id, updatedData, {
                new: true,
            });

            if (result) {
                await products.update();
                res.status(200).json({
                    message: "Updated product successfully",
                });
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (err) {
            res.status(500).json({ status: 500, message: err.message });
        }
    }
}

module.exports = new adminController();
