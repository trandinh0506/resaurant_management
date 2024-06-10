const authenticationService = require("../Services/authentication.Service");
class userController {
    booking(req, res) {
        const token = req.header["Authorization"];
        authenticationService.validate(
            token,
            () => {
                const { tableId, orderItems } = req.body;
                console.log(tableId, orderItems);
            },
            () => {
                res.status(403);
            }
        );
    }
}

module.exports = new userController();
