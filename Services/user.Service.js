const mongoose = require("mongoose");
const tableModel = require("../Models/table.Model");
const productModel = require("../Models/product.Model");

class userService {
    async booking(tableId, orderItems) {
        const table = await tableModel.findById(tableId);
        console.log(table);
        console.log(orderItems);
        orderItems.forEach((item) => {
            console.log(item);
        });

        return { status: 200, message: "ok" };
    }
}

module.exports = new userService();
