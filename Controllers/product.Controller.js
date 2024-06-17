const jwt = require("jsonwebtoken");
const products = require("../products");
const authenticationService = require("../Services/authentication.Service");

class productController {
    async get(req, res) {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Missing authorization token" });
            return;
        }
        const { isSuccess } = authenticationService.validate(token);

        if (isSuccess) {
            res.status(200).json(await products.get());
            return;
        }
        res.status(403).json({ message: "Access Denied" });
    }
}

module.exports = new productController();
