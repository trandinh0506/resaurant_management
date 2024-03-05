const Product = require("./Models/product.Model");

function products() {
    const products = [];

    const isEmty = () => {
        return products.length === 0;
    };

    const update = async () => {
        try {
            const result = await Product.find({ modify: true });
            products.length = 0;
            result.forEach((item) => products.push(item));
        } catch (error) {
            console.error("Error updating products:", error);
        }
    };

    const get = async () => {
        if (isEmty()) {
            await update();
        }
        return products;
    };

    return {
        isEmty,
        update,
        get,
    };
}

module.exports = new products();
