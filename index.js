const express = require("express");
const mongoose = require("mongoose");

const app = express();

require("dotenv").config();
// app.use(
//     cors({
//         origin: "*.*",
//         methods: ["GET", "PUT", "POST"],
//     })
// );
app.use(express.json());
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    category: String,
});

const Product = mongoose.model("Product", productSchema);
async function getProduct() {
    const products = await Product.find();
    console.log(products);
}

getProduct();

app.get("/testapi", (req, res) => {
    console.log(req.headers, "request from client");
    res.send(JSON.stringify({ status: "ok", data: "some data" }));
});
app.post("/testpostapi", (req, res) => {
    console.log(req.body);
    console.log(req.headers);
    res.send("ok data has been received");
});
app.get("/", (req, res) => {
    res.status(200).send("ok");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
