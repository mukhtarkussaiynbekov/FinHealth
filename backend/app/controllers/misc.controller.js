const db = require("../models/index.js");
const User = db.user;
const Role = db.role;

const reset = (req, res) => {
    User.findById(req.userId, (err, user) => {
        if (err || !user) {
            res.status(500).send({ message: err });
            return;
        }

        for (let i = 0; i < user.income.length; i++) {
            user.income[i].amount = 0;
        }
        for (let i = 0; i < user.categories.length; i++) {
            user.categories[i].balance = 0;
        }
        user.save(err => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                res.status(200).send({ message: `Successfully reset accounts and categories`, categories: user.categories, income: user.income });
                });
    })
}
module.exports = {
    reset
};