const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");

require("dotenv").config();

const app = express();

const server = http.createServer(app);
const Socket = require("./Socket");

app.use(express.json());
const corsOptions = {
    origin: process.env.ORIGIN,
    methods: ["GET", "PUT", "DELETE", "POST"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
};

app.use(cors(corsOptions));

// Explicitly handle preflight requests
app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
    res.sendStatus(200);
});

// Apply additional headers for all requests
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
    next();
});

app.use(cookieParser());

// DB connection
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// Initialize Socket.IO
const io = Socket.init(server, {
    cors: {
        origin: process.env.ORIGIN,
        methods: ["GET", "PUT", "DELETE", "POST"],
        allowedHeaders: ["Authorization", "Content-Type"],
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

// routes
const authRoutes = require("./Routes/authentication.Route");
const productRoutes = require("./Routes/product.Route");
const adminRoutes = require("./Routes/admin.Route");
const tableRoutes = require("./Routes/table.Route");
const userRoutes = require("./Routes/user.Route");

app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/admin", adminRoutes);
app.use("/table", tableRoutes);
app.use("/user", userRoutes);

// 404 not found
// app.use((req, res) => {
//     res.status(404).json({ message: "Not Found" });
// });
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
