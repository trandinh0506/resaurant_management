const Table = require("./Models/table.Model");

function tables() {
    const tables = [];
    isEmty = () => {
        return tables.length == 0;
    };
    update = async () => {
        const result = await Table.find();
        tables.length = 0;
        result.forEach((item) => tables.push(item));
    };
    get = async () => {
        if (isEmty()) await update();
        return tables;
    };
    return {
        isEmty,
        update,
        get,
    };
}

module.exports = new tables();
