const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// routes
const authRoutes = require("./Routes/authentication.Route");
const productRoutes = require("./Routes/product.Route");
const adminRoutes = require("./Routes/admin.Route");

app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/admin", adminRoutes);
// 404 not found
app.use((req, res) => {
    res.status(404).json({ message: "Not Found" });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
