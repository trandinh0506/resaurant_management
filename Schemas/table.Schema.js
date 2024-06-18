const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
    tableName: {
        type: String,
        required: true,
        unique: true,
    },
    isBooked: {
        type: Boolean,
        default: false,
    },
    orderedItems: {
        type: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products",
                },
                productName: String,
                quantity: { type: Number, default: 0 },
                price: { type: Number, default: 0 },
            },
        ],
        default: [],
    },
    numberOfSeats: {
        type: Number,
        required: true,
    },
    notes: String,
    startTime: Date,
    endTime: Date,
});

module.exports = tableSchema;
