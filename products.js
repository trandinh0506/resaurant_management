const Product = require("./Models/product.Model");

function products() {
    const productList = [];

    const isEmty = () => {
        return productList.length === 0;
    };

    const update = async () => {
        try {
            const result = await Product.find({ modify: true });
            productList.length = 0;
            result.forEach((item) => productList.push(item));
        } catch (error) {
            console.error("Error updating productList:", error);
        }
    };

    const get = async () => {
        if (isEmty()) {
            await update();
        }
        return [...productList];
    };

    return {
        isEmty,
        update,
        get,
    };
}

module.exports = new products();
