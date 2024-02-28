const Product = require("./Models/product.Model");

function products() {
    const products = [];
    isEmty = () => {
        return products.length == 0;
    };
    update = async () => {
        const result = await Product.find({ modify: true });
        products.length = 0;
        result.forEach((item) => products.push(item));
    };
    get = async () => {
        if (isEmty()) await update();
        return products;
    };
    return {
        isEmty,
        update,
        get,
    };
}

module.exports = new products();
