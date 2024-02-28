const authenticationService = require("../Services/authentication.Service");

class authenticationController {
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const result = await authenticationService.login(
                username,
                password
            );

            res.status(result.status).send(result.message);
        } catch (err) {
            console.log("500 internal server error: " + err);
            res.status(500).send(err.message);
        }
    }
    async register(req, res) {
        try {
            const { username, password } = req.body;
            const result = await authenticationService.register(
                username,
                password
            );
            res.status(result.status).send(result.message);
        } catch (err) {
            console.log("500 internal server error: " + err);
            res.status(500).send(err.message);
        }
    }
}

module.exports = new authenticationController();
