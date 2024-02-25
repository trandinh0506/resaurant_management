class productController {
    index(req, res) {}
    get(req, res) {
        res.status(200).send("ok");
    }
}

module.exports = new productController();
