const db = require("../models/index.js");
const User = db.user;
const Role = db.role;

const createAccount = (req, res) => {
    User.findById(req.userId, (err, user) => {
        if (err || !user) {
            res.status(500).send({ message: err });
            return;
        } 

        user.accounts.push({
            name: req.body.name,
            balance: req.body.balance
        });
        user.save(err => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            res.status(200).send({ message: `Successfully created account ${req.body.name}` });
        });
        
    })
}

const deleteAccount = (req, res) => {
    User.findById(req.userId, (err, user) => {
        if (err || !user) {
            res.status(500).send({ message: err });
            return;
        }
        for (let i = 0; i < user.accounts.length; i++) {
            if (user.accounts[i].name === req.body.name) {
                user.accounts.splice(i, 1);
                user.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.status(200).send({ message: `Successfully deleted account ${req.body.name}` });
                });
                return;
            }
        }
        res.status(404).send({ message: "No such account exists" });
    })
}

module.exports = {
    createAccount,
    deleteAccount
};