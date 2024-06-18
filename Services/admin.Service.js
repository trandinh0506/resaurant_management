const authenticationService = require("../Services/authentication.Service");
const Product = require("../Models/product.Model");
const products = require("../products");
class adminService {
    validateAdminToken(token) {
        const { isSuccess, decoded } = authenticationService.validate(token);

        return isSuccess && decoded.role == "admin";
    }
    async addProduct(name, price, description, imageUrl) {
        try {
            const newProduct = new Product({
                name,
                price,
                description,
                category: "",
                imageUrl,
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
            const update = { $set: { [modify]: false } };
            const result = await Product.findByIdAndUpdate(id, update);
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
    async updateProduct(id, name, price, description, category, imageUrl) {
        try {
            const updatedData = {
                name,
                price,
                description,
                category,
                imageUrl,
            };

            const result = await Product.findByIdAndUpdate(id, updatedData);

            if (result) {
                await products.update();
                return { status: 200, message: "Updated product successfully" };
            } else {
                return { status: 404, message: "Product not found" };
            }
        } catch (err) {
            return { status: 500, message: err.message };
        }
    }
}

module.exports = new adminService();
