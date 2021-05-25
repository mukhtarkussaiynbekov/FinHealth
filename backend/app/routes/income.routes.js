const { createIncome, deleteIncome, changeIncome } = require("../controllers/income.controller.js");
const { authJwt } = require("../middlewares/index.js");
 
module.exports = function (app) {
    
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/income",[authJwt.verifyToken], createIncome);
    app.delete("/income", [authJwt.verifyToken], deleteIncome);
    app.put("/income", [authJwt.verifyToken], changeIncome);
};