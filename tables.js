const Table = require("./Models/table.Model");

function tables() {
    const tableList = [];
    isEmty = () => {
        return tableList.length == 0;
    };
    update = async () => {
        const result = await Table.find();
        tableList.length = 0;
        result.forEach((item) => tableList.push(item));
    };
    get = async () => {
        if (isEmty()) await update();
        return [...tableList];
    };
    return {
        isEmty,
        update,
        get,
    };
}

module.exports = new tables();
