const { verifySignUp } = require("../middlewares/index.js");
const controller = require("../controllers/auth.controller.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/signup",
    [
      verifySignUp.checkDuplicateEmail,
      verifySignUp.checkRoles
    ],
    controller.signUp
  );

  app.post("/signin", controller.signIn);
};