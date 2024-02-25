const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    balance: Number,
    role: String,
});

module.exports = userSchema;
