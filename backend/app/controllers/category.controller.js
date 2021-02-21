const db = require("../models/index.js");
const User = db.user;
const Role = db.role;

const createCategory = (req, res) => {
    User.findById(req.userId, (err, user) => {
        if (err || !user) {
            res.status(500).send({ message: err });
            return;
        } 

        user.categories.push({
            name: req.body.name,
            balance: req.body.budget,
            budget: req.body.budget
        });
        user.save(err => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            res.status(200).send({ message: `Successfully created category ${req.body.name}` });
        });
        
    })
}

const deleteCategory = (req, res) => {
    User.findById(req.userId, (err, user) => {
        if (err || !user) {
            res.status(500).send({ message: err });
            return;
        }
        for (let i = 0; i < user.categories.length; i++) {
            if (user.categories[i].name === req.body.name) {
                user.categories.splice(i, 1);
                user.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.status(200).send({ message: `Successfully deleted category ${req.body.name}` });
                });
                return;
            }
        }
        res.status(404).send({ message: "No such category exists" });
    })
}

module.exports = {
    createCategory,
    deleteCategory
};