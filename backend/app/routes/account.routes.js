const { createAccount, deleteAccount } = require("../controllers/account.controller.js");
const { authJwt } = require("../middlewares/index.js");

 
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/account",[authJwt.verifyToken], createAccount);
    app.delete("/account", [authJwt.verifyToken], deleteAccount);
};