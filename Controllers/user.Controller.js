const authenticationService = require("../Services/authentication.Service");
const userService = require("../Services/user.Service");
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
            res.status(result.status).send(result.message);
            return;
        }
        res.status(403).json({ message: "Access Denied" });
    }
    async viewOrderedItems(req, res) {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Missing authorization token" });
            return;
        }
        const { isSuccess } = authenticationService.validate(token);

        if (isSuccess) {
            const id = req.headers.id;
            const result = await userService.viewOrderedItems(id);
            res.status(result.status).send(result.message);
            return;
        }
        res.status(403).json({ message: "Access Denied" });
    }
    async pay(req, res) {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Missing authorization token" });
            return;
        }
        const { isSuccess } = authenticationService.validate(token);

        if (isSuccess) {
            const id = req.headers.id;

            const result = await userService.pay(id);
            res.status(result.status).send(result.message);
            return;
        }
        res.status(403).json({ message: "Access Denied" });
    }
    async resetTable(req, res) {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Missing authorization token" });
            return;
        }
        const { isSuccess } = authenticationService.validate(token);

        if (isSuccess) {
            const id = req.headers.id;
            const result = await userService.resetTable(id);
            res.status(result.status).send(result.message);
            return;
        }
        res.status(403).json({ message: "Access Denied" });
    }
}

module.exports = new userController();
