const userSchema = require("../Schemas/user.Schema");
const mongoose = require("mongoose");

const User = mongoose.model("User", userSchema);

module.exports = User;
