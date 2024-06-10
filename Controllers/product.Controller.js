const products = require("../products");
const authenticationService = require("../Services/authentication.Service");

class productController {
    async get(req, res) {
        const token = ""; // handle to get token req.header["Authorization"]
        authenticationService.validate(
            token,
            async () => {
                res.status(200).json(await products.get());
            },
            () => {
                res.status(403).json({ message: "Access denied!" });
            }
        );
    }
}

module.exports = new productController();
