const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    category: String,
    imageUrl: String,
    modify: { type: Boolean, required: true },
});

module.exports = productSchema;
