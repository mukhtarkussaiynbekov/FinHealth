const { authJwt } = require("../middlewares/index.js");
const { reset } = require("../controllers/misc.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/reset",[authJwt.verifyToken], reset);
};