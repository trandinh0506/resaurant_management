const userSchema = require("../Schemas/user.Schema");
const mongoose = require("mongoose");

const User = mongoose.model("users", userSchema);

module.exports = User;
