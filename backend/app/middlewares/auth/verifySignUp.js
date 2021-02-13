const db = require("../../models/index.js");
const authConfig = require("../../config/auth.config.js");
const User = db.user;
checkDuplicateEmail = (req, res, next) => {
    User.findOne({
        email: req.body.email
    })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: "Database error." });
                return;
            }
            if (user) {
                res.status(400).send({ message: "Email is already in use." });
                return;
            }
            next();
        })
}
checkRoles = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!db.ROLES.includes(req.body.roles[i])) {
                res.status(400).send({ message: "Non existing role" });
                return;
            }
            if (req.body.roles[i] === "admin" && req.body.email !== authConfig.admin) {
                res.status(403).send({ message: "Forbidden" });
                return;
            }
        }
        
    }
    next();
}
module.exports = { checkDuplicateEmail, checkRoles };

