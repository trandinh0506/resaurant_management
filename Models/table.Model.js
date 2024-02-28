const tableSchema = require("../Schemas/table.Schema");
const mongoose = require("mongoose");

const Table = mongoose.model("tables", tableSchema);

module.exports = Table;
