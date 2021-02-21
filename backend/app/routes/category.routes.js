const { createCategory, deleteCategory } = require("../controllers/category.controller.js");
const { authJwt } = require("../middlewares/index.js");

 
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/category",[authJwt.verifyToken], createCategory);
    app.delete("/category", [authJwt.verifyToken], deleteCategory);
};