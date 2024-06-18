const tableModel = require("../Models/table.Model");
const tables = require("../tables");
const Socket = require("../Socket");
class userService {
    async booking(tableId, orderItems) {
        const table = await tableModel.findById(tableId);
        if (!table) {
            return { status: 404, message: "Table not found" };
        }
        orderItems.forEach((item) => {
            table.orderedItems.push(item);
        });
        await table.save();

        await tables.update();

        const socket = Socket.getIO();
        socket.emit("updateTable", await tables.get());

        return { status: 200, message: "ok" };
    }
    async viewOrderedItems(id) {
        const table = await tableModel.findById(id);
        if (!table) {
            return { status: 404, message: "Table not found" };
        }
        return { status: 200, message: table.orderedItems };
    }
    async pay(id) {
        const table = await tableModel.findById(id);
        if (!table) {
            return { status: 404, message: "Table not found" };
        }
        table.orderedItems = [];
        table.isBooked = false;
        await table.save();
        await tables.update();
        // realtime socket send updated table to admin page
        const socket = Socket.getIO();
        socket.emit("updateTable", await tables.get());

        return { status: 200, message: "OK" };
    }
    async resetTable(id) {
        const table = await tableModel.findById(id);
        if (!table) {
            return { status: 404, message: "Table not found" };
        }
        table.orderedItems = [];
        table.isBooked = false;
        await table.save();
        await tables.update();
        // realtime socket send updated table to admin page
        const socket = Socket.getIO();
        socket.emit("updateTable", await tables.get());
        return { status: 200, message: "OK" };
    }
}

module.exports = new userService();
