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
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products",
                },
                quantity: { type: Number, default: 0 },
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
    total: Number,
    paid: Boolean,
});

module.exports = tableSchema;
