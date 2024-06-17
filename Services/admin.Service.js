const authenticationService = require("../Services/authentication.Service");
const Product = require("../Models/product.Model");
const products = require("../products");
class adminService {
    validateAdminToken(token) {
        const { isSuccess, decoded } = authenticationService.validate(token);

        return isSuccess && decoded.role == "admin";
    }
    async addProduct(name, price, description, category) {
        try {
            const newProduct = new Product({
                name,
                price,
                description,
                category,
                modify: true,
            });
            await newProduct.save();
            await products.update();
            return { status: 201, message: "Product added successfully!" };
        } catch (err) {
            return { status: 500, message: err.message };
        }
    }
    async removeProduct(id) {
        try {
            const result = await Product.findByIdAndDelete(id);
            if (result) {
                await products.update();
                return { status: 200, message: "Product deleted successfully" };
            } else {
                return { status: 404, message: "Product not found" };
            }
        } catch (err) {
            return { status: 500, message: err.message };
        }
    }
    async updateProduct(id, name, price, description, category) {
        try {
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

module.exports = new adminService();
