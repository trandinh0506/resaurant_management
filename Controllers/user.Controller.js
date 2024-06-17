const authenticationService = require("../Services/authentication.Service");
const userService = require("../Services/user.Service");
const tables = require("../tables");
const Socket = require("../Socket");
class userController {
    async booking(req, res) {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Missing authorization token" });
            return;
        }
        const { isSuccess } = authenticationService.validate(token);

        if (isSuccess) {
            const { tableId, orderItems } = req.body;
            const result = await userService.booking(tableId, orderItems);
            console.log(result);
            const socket = Socket.getIO();
            socket.emit("updateTable", await tables.get());
            res.status(result.status).send(result.message);
            return;
        }
        res.status(403).json({ message: "Access Denied" });
    }
}

module.exports = new userController();
