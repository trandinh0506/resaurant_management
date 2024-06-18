const tables = require("../tables");
const authenticationService = require("../Services/authentication.Service");
const tableModel = require("../Models/table.Model");

class tableController {
    async get(req, res) {
        const token =
            req.headers.authorization?.split(" ")[1] || req.cookies.token;
        if (!token) {
            res.status(401).json({ message: "Missing authorization token" });
            return;
        }
        const { isSuccess } = authenticationService.validate(token);

        if (isSuccess) {
            res.status(200).json(await tables.get());
            return;
        }
        res.status(403).json({ message: "Access Denied" });
    }
    async chooseTable(req, res) {
        const token =
            req.headers.authorization?.split(" ")[1] || req.cookies.token;
        if (!token) {
            res.status(401).json({ message: "Missing authorization token" });
            return;
        }
        const { isSuccess } = authenticationService.validate(token);
        if (isSuccess) {
            const id = req.headers.id;
            if (!id) {
                res.status(400).send(
                    "Bad Request. Missing id in request headers"
                );
                return;
            }
            const table = await tableModel.findById(id);
            if (!table) {
                res.status(404).send("Table not found");
                return;
            }
            if (table.isBooked) {
                res.status(423).send("Table is booked currently");
                return;
            }
            table.isBooked = true;
            await table.save();
            await tables.update();
            res.status(200).send("OK");
            return;
        }
        res.status(403).json({ message: "Access Denied" });
    }
}

module.exports = new tableController();
