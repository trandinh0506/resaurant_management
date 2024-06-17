const authenticationService = require("../Services/authentication.Service");

class authenticationController {
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const result = await authenticationService.login(
                username,
                password
            );
            const token = result.message;
            const userAgent = req.headers["user-agent"] || "";
            const isWebClient =
                userAgent.includes("Mozilla") ||
                userAgent.includes("Chrome") ||
                userAgent.includes("Safari");
            if (isWebClient) {
                // Set the token as an HTTP-only cookie for web clients
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production", // Ensure secure cookies in production
                    sameSite: "strict",
                });

                res.status(result.status).send(token);
                return;
            }

            res.status(result.status).send(token);
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
