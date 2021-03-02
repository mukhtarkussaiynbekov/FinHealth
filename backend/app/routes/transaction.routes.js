const { createTransaction, deleteTransaction, changeTransaction, getAllTransactions } = require("../controllers/transaction.controller.js");
const { authJwt } = require("../middlewares/index.js");
 
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/transaction", [authJwt.verifyToken], createTransaction);
    /* Experimental feature
    
    app.delete("/transaction", [authJwt.verifyToken], deleteTransaction);
    
    */
    app.put("/transaction/:id", [authJwt.verifyToken], changeTransaction);

    app.get("/transaction", [authJwt.verifyToken], getAllTransactions);
    

};