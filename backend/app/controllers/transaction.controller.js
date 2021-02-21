const db = require("../models/index.js");
const User = db.user;
const Role = db.role
const Transaction = db.transaction;

const createTransaction = async (req, res) => {
    let transaction = new Transaction({
        date: req.body.date,
        transaction: req.body.transaction,
        owner: req.userId,
        account: req.body.account,
        category: req.body.category,
        tag: req.body.tag
    });
    await User.findById(transaction.owner, (err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        let accountIndex = -1;
        let categoryIndex = -1;
        for (let i = 0; i < user.accounts.length; i++) {

            if (user.accounts[i].name === transaction.account) {
                accountIndex = i;
                break;
            }
        }
        for (let i = 0; i < user.categories.length; i++) {
            if (user.categories[i].name === transaction.category) {
                categoryIndex = i;
                break;
            }
        }
        if (accountIndex == -1) {
            res.status(404).send({ message: "Such account does not exist" });
            return;
        }
        if (categoryIndex == -1) {
            res.status(404).send({ message: "Such category does not exist" });
            return;
        }
        user.accounts[accountIndex].balance -= transaction.transaction;
        user.categories[categoryIndex].balance -= transaction.transaction;
        user.save().then(result => {
            transaction.save().then(result => {
                res.status(200).send({ message: "Transaction was saved successfully " });
            })
            .catch(err => {
                res.status(500).send({ message: err });
            })
        })
        .catch(err => {
            res.status(500).send({ message: err });
        })

    })
}

const deleteTransaction = (req, res) => {
    Transaction.findOneAndDelete({
        date: req.body.date,
        transaction: req.body.transaction,
        owner: req.userId
    }, (err, transaction) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!transaction) {
            res.status(404).send({ message: "Transaction not found" });
            return;
        }
        return res.status(200).send({ message: "Transaction was deleted successfully" });
    })
}

const getAllTransactions = (req, res) => {
    Transaction.find({
        owner: req.userId
        },
        {
            owner: 0,
            _id: 0
        }   
    ).sort({ _id: 1, __v: 1 }).limit(100).exec((err, transactions) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send(transactions);
    })
}

module.exports = {
    createTransaction,
    deleteTransaction,
    getAllTransactions
}