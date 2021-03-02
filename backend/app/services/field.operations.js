const db = require("../models/index.js");
const User = db.user;
const Role = db.role;

const createField = (req, res, field) => {
    User.findById(req.userId, (err, user) => {
        if (err || !user) {
            res.status(500).send({ message: err });
            return;
        } 
        let collections = [];
        if (field === "income") {
            collections = user.income;
            collections.push({
                name: req.body.name,
                amount: req.body.amount
            });
        }
        else if (field === "categories") {
            collections = user.categories;
            collections.push({
                name: req.body.name,
                balance: req.body.budget,
                budget: req.body.budget
            });
        }
        else if (field === "accounts") {
            collections = user.accounts;
            collections.push({
                name: req.body.name,
                balance: req.body.balance
            });            
        }

        user.save(err => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            res.status(200).send({ message: `Successfully created ${field} ${req.body.name}` });
        });
        
    })
}

const deleteField = (req, res, field) => {
    User.findById(req.userId, (err, user) => {
        if (err || !user) {
            res.status(500).send({ message: err });
            return;
        }
        let collections = [];
        if (field === "income") collections = user.income;
        else if (field === "categories") collections = user.categories;
        else if (field === "accounts") collections = user.accounts;

        for (let i = 0; i < collections.length; i++) {
            if (collections[i].name === req.body.name) {
                collections.splice(i, 1);
                user.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.status(200).send({ message: `Successfully deleted ${field} ${req.body.name}` });
                });
                return;
            }
        }
        res.status(404).send({ message: "No such field exists" });
    })
}

module.exports = {
    createField,
    deleteField
};