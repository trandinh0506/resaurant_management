const adminService = require("../Services/admin.Service");

class adminController {
    validateAdminToken(req, res) {
        const token =
            req.headers.authorization?.split(" ")[1] || req.cookies.token;
        if (!token) {
            res.status(401).send("Missing authorization");
            return;
        }
        const isAdmin = adminService.validateAdminToken(token);
        if (isAdmin) {
            res.status(200).send("OK");
            return;
        }
        res.status(403).send("Access Denied");
    }
    async addProduct(req, res) {
        const token =
            req.headers.authorization?.split(" ")[1] || req.cookies.token;
        if (!token) {
            res.status(401).send("Missing authorization");
            return;
        }
        const isAdmin = adminService.validateAdminToken(token);
        if (!isAdmin) {
            res.status(403).send("Access Denied");
            return;
        }
        try {
            const { name, price, description, imageUrl } = req.body;
            const result = await adminService.addProduct(
                name,
                price,
                description,
                imageUrl
            );
            res.status(result.status).send(result.message);
        } catch (err) {
            console.log(err);
            res.status(500).send(err.message);
        }
    }
    async removeProduct(req, res) {
        const token =
            req.headers.authorization?.split(" ")[1] || req.cookies.token;
        if (!token) {
            res.status(401).send("Missing authorization");
            return;
        }
        const isAdmin = adminService.validateAdminToken(token);
        if (!isAdmin) {
            res.status(403).send("Access Denied");
            return;
        }
        try {
            const id = req.headers.id;
            const result = await adminService.removeProduct(id);
            res.status(result.status).send(result.message);
        } catch (err) {
            console.log("error: ", err);
            res.status(500).send(err.message);
        }
    }
    async updateProduct(req, res) {
        const token =
            req.headers.authorization?.split(" ")[1] || req.cookies.token;
        if (!token) {
            res.status(401).send("Missing authorization");
            return;
        }
        const isAdmin = adminService.validateAdminToken(token);
        if (!isAdmin) {
            res.status(403).send("Access Denied");
            return;
        }
        try {
            const id = req.headers.id;
            const { name, price, description, category, imageUrl } = req.body;
            const result = await adminService.updateProduct(
                id,
                name,
                price,
                description,
                category,
                imageUrl
            );
            res.status(result.status).send(result.message);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = new adminController();
