const tables = require("../tables");

class tableController {
    async get(req, res) {
        res.status(200).json(await tables.get());
    }
}

module.exports = new tableController();
